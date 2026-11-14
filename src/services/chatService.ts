import {sendJsonMessage} from "./websocketService.ts"
import type {ChatType, Message, RoomUserItem} from "../types/chat.ts";
import {addMessage, getConversationId, setMessages, setOnlineStatus, setUserlist} from "../store/slices/chatSlice.ts";
import {store} from "../store/store.ts";

let currentUser : string | null = null;
let currentChatTarget: { name: string; type: ChatType } | null = null;
export function encodeEmoji(text: string): string {
    if (!text) {
        return "";
    }
    return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(emoji) {
        const codePoint = emoji.codePointAt(0);
        if (codePoint !== undefined) {
            const hexCode = codePoint.toString(16);
            return `[e:${hexCode}]`;
        }
        return emoji;
    });
}
export function decodeEmoji(text: string): string {
    if (!text) {
        return "";
    }
    return text.replace(/\[e:([0-9a-fA-F]+)\]/g, function(match, hexString) {
        const codeNumber = parseInt(hexString, 16);
        const isInvalid = isNaN(codeNumber) || codeNumber < 0 || codeNumber > 0x10FFFF;
        if (isInvalid) {
            return match;
        }
        return String.fromCodePoint(codeNumber);
    });
}
let checkUserExist: ((isExist: boolean) => void) | null = null;

export function sendGetUserList(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "GET_USER_LIST",
            data: {}
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
export function sendCheckUserExist(username: string, callback?: (isExist: boolean) => void) {
    checkUserExist = callback || null;
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "CHECK_USER_EXIST",
            data: {
                user: username.trim(),
            }
        }
    });
}
// gửi tn
export function sendChatMessage(to: string, mes: string, type: "people" | "room" = "people") {
    return sendJsonMessage({
        action: "onchat",
        data: {
            event: "SEND_CHAT",
            data: {
                type: type,
                to: to,
                mes: encodeEmoji(mes),
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
                event: "GET_PEOPLE_CHAT_MES",
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
        console.error(response.error);
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
                text: decodeEmoji(data.mes),
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isMe: false,
            };
            store.dispatch(addMessage({ conversationId, message: newMsg }));
            break;
        }
        case "GET_PEOPLE_CHAT_MES": {
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
                    text: decodeEmoji(item.mes),
                    time: timeStr,
                    isMe: item.name === myUsername,
                };
            });
            // sắp xếp tn
            messages.sort((a, b) => Number(a.id) - Number(b.id));
            store.dispatch(setMessages({ conversationId, messages }));
            break;
        }
        case "CHECK_USER_EXIST": {
            if (checkUserExist) {
                const isExist = response.data?.status === true;
                checkUserExist(isExist);
                checkUserExist = null;
            }
            break;
        }
        default:
            break;
    }
}