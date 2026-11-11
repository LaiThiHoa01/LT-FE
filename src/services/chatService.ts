import {sendJsonMessage} from "./websocketService.ts"
import type {ChatType, Message, RoomUserItem} from "../types/chat.ts";
import {addMessage, getConversationId, setMessages, setOnlineStatus, setUserlist} from "../store/slices/chatSlice.ts";
import {store} from "../store/store.ts";

let currentUser : string | null = null;
let currentChatTarget: { name: string; type: ChatType } | null = null;
export function sendGetUserList(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "GET_USER_LIST",
            data: {}
        }
    })
}
export function sendCreateRoom(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "CREATE_ROOM",
            data: {
                name : "ABC",
            }
        }
    })
}
export function sendJoinRoom(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "JOIN_ROOM",
            data: {
                name : "ABC",
            }
        }
    })
}
export function sendOutRoom(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "OUT_ROOM",
            data: {
                name : "ABC",
            }
        }
    })
}
export function sendCheckUserOnline(username : string){
    currentUser = username;
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "CHECK_USER_ONLINE",
            data: {
                user: username,
            }
        }
    })
}
// gửi tn
export function sendChatMessage(to: string, mes: string, type: "people" | "room" = "people") {
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "SEND_CHAT",
            data: {
                type: type,
                to: to,
                mes: mes,
            }
        }
    });
}
//  lịch sử tn
export function sendGetPeopleMessages(name: string, page = 1, type: ChatType = 0) {
    currentChatTarget = { name, type };
    if (type === 1) {
        sendJsonMessage({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: name,
                }
            }
        });
    } else {
        sendJsonMessage({
            action: "onchat",
            data: {
                event: "CHAT_PEOPLE_GET_MES",
                data: {
                    name: name,
                    page: page,
                }
            }
        });
    }
}
export function handleChatUser(response: any ){
    if(!response) return;
    if(response.status === "error"){
        console.error("ERROR: " + response.status);
        return;
    }
    if(response.status !== "success") return;

    switch(response.event){
        case "GET_USER_LIST": {
            const list: RoomUserItem[] = response.data;
            store.dispatch(setUserlist(list));
            break;
        }
        case "CHECK_USER_ONLINE": {
            if(currentUser){
                store.dispatch(setOnlineStatus({
                    name: currentUser,
                    isOnline: response.data.status,
                }));
                currentUser = null;
            }
            break;
        }
         case "SEND_CHAT": {
            const data = response.data;
            if (!data) break;
            const myUsername = localStorage.getItem("username");
            const isMe = data.name === myUsername;
            const partnerName = isMe ? data.to : data.name;
            const chatType = (data.type ?? 0) as ChatType;
            const conversationId = getConversationId(partnerName, chatType);
            if (isMe) break;
            const newMsg: Message = {
                id: String(Date.now()),
                senderId: data.name,
                text: data.mes,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isMe: false,
            };
            store.dispatch(addMessage({ conversationId, message: newMsg }));
            break;
        }
        case "JOIN_ROOM":
        case "CHAT_PEOPLE_GET_MES": {
            const myUsername = localStorage.getItem("username");
            let rawList: any[] = [];
            let partnerName = currentChatTarget?.name;
            let chatType: ChatType = currentChatTarget?.type ?? 0;
            if (Array.isArray(response.data)) {
                rawList = response.data;
                chatType = 0;
                if (!partnerName && rawList.length > 0) {
                    partnerName = rawList[0].name === myUsername ? rawList[0].to : rawList[0].name;
                }
            } else if (response.data && typeof response.data === "object") {
                rawList = response.data.chatMess || [];
                partnerName = response.data.name || partnerName;
                chatType = 1;
            }
            if (!partnerName) break;
            const conversationId = getConversationId(partnerName, chatType);
            const messages: Message[] = rawList.map(item => {
                let timeStr = "";
                if (item.createAt) {
                    const parts = item.createAt.split(" ");
                    timeStr = parts[1] ? parts[1].slice(0, 5) : item.createAt;
                }
                return {
                    id: String(item.id),
                    senderId: item.name,
                    text: item.mes,
                    time: timeStr,
                    isMe: item.name === myUsername,
                };
            });
            // sắp xếp tn
            messages.sort((a, b) => Number(a.id) - Number(b.id));
            store.dispatch(setMessages({ conversationId, messages }));
            break;
        }
        default:
            break;
    }
}