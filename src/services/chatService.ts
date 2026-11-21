import {sendJsonMessage} from "./websocketService.ts"
import type {ChatType, Message, RoomUserItem} from "../types/chat.ts";
import {addMessage, addRoom, getConversationId, setMessages, setOnlineStatus, setUserlist} from "../store/slices/chatSlice.ts";
import {store} from "../store/store.ts";
import {isRoomLeft} from "./roomService.ts";

const onlineCheckQueue: string[] = [];
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
let checkUserExist: ((isExist: boolean, hasError?: boolean) => void) | null = null;

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
    const trimmed = username.trim();
    if (!trimmed || onlineCheckQueue.includes(trimmed)) return;
    if (sendJsonMessage({
        action: "onchat",
        data: {
            event: "CHECK_USER_ONLINE",
            data: {
                user: trimmed,
            }
        }
    }))
    onlineCheckQueue.push(trimmed);
}
export function sendCheckUserExist(username: string, callback?: (isExist: boolean, hasError?: boolean) => void) {
    if (!callback) return;
    const isSent = sendJsonMessage({
        action: "onchat",
        data: {
            event: "CHECK_USER_EXIST",
            data: {
                user: username.trim(),
            }
        }
    });
    if (!isSent) {
        callback(false, true);
        return;
    }
    const timer = setTimeout(() => {
        if (checkUserExist) {
            checkUserExist = null;
            callback(false, true);
        }
    }, 5000);
    checkUserExist = (isExist, hasError) => {
        clearTimeout(timer);
        callback(isExist, hasError);
    };
}
// gửi tn
export function sendChatMessage(to: string, mes: string, type: "people" | "room" = "people"): boolean {
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
let lastRequested: { name: string; type: ChatType; time: number } | null = null;
//  lịch sử tn
export function sendGetPeopleMessages(name: string, page = 1, type: ChatType = 0) {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    if (type === 1 && isRoomLeft(trimmedName)) return;
    const now = Date.now();
    if (lastRequested && lastRequested.name === trimmedName && lastRequested.type === type && now - lastRequested.time < 400)
        return;
    lastRequested = { name: trimmedName, type, time: now };
    currentChatTarget = { name: trimmedName, type };
    if (type === 1) {
        sendJsonMessage({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: trimmedName,
                }
            }
        });
    } else {
        sendJsonMessage({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: trimmedName,
                    page: page,
                }
            }
        });
    }
}
export function handleChatUser(response: any ){
    if(!response) return;
    if(response.status === "error"){
        console.error(response.mes || response.error);
        if (response.event === "CHECK_USER_ONLINE") {
            const targetUser = onlineCheckQueue.shift();
            if (targetUser) {
                store.dispatch(setOnlineStatus({ name: targetUser, isOnline: false }));
            }
        }
        if (checkUserExist && (response.event === "CHECK_USER_EXIST" || !response.event)) {
            const callback = checkUserExist;
            checkUserExist = null;
            callback(false, true);
        }
        return;
    }
    if(response.status !== "success") return;

    switch(response.event){
        case "GET_USER_LIST": {
            const rawList: RoomUserItem[] = Array.isArray(response.data) ? response.data : [];
            const list = rawList.filter(item => !(item.type === 1 && isRoomLeft(item.name)));
            store.dispatch(setUserlist(list));
            for (const item of list) {
                if (item.type === 0 && item.name) {
                    sendCheckUserOnline(item.name);
                }
            }
            const currentActive = store.getState().chat.activeTarget;
            if (currentActive?.name) {
                sendGetPeopleMessages(currentActive.name, 1, currentActive.type);
            }
            break;
        }
        case "CHECK_USER_ONLINE": {
            const targetUser = onlineCheckQueue.shift();
            if (targetUser) {
                store.dispatch(setOnlineStatus({
                    name: targetUser,
                    isOnline: Boolean(response.data?.status),
                }));
            }
            break;
        }
         case "SEND_CHAT": {
            const data = response.data;
            if (!data) break;
            const myUsername = localStorage.getItem("username");
            const isMe = myUsername && data.name && data.name.trim().toLowerCase() === myUsername.trim().toLowerCase();
            const isRoom = data.type === "room" || data.type === 1 || data.type === "1";
            const partnerName = isRoom ? data.to : (isMe? data.to : data.name)
            if(!partnerName || (isRoom && isRoomLeft(partnerName))) break;
            const chatType: ChatType = isRoom ? 1 : 0;
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
        case "JOIN_ROOM": {
            const raw = response.data;
            const roomName = (typeof raw === "string" ? raw : raw?.name) || currentChatTarget?.name;
            if (!raw || !roomName || isRoomLeft(roomName))
                break;
            const myUsername = localStorage.getItem("username");
            const chatData = raw.chatData || raw.chatMess;
            const chatList = Array.isArray(chatData) ? chatData : [];
            const fallbackTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const messages: Message[] = chatList
                .map((item: any) => ({
                    id: String(item.id || Date.now()),
                    senderId: item.name,
                    text: decodeEmoji(item.mes),
                    time: item.createAt?.split(" ")[1]?.slice(0, 5) || item.createAt || fallbackTime,
                    isMe: item.name === myUsername,
                }))
                .sort((a, b) => Number(a.id) - Number(b.id));
            store.dispatch(addRoom(roomName));
            store.dispatch(setMessages({
                conversationId: getConversationId(roomName, 1),
                messages,
            }));
            break;
        }
        case "GET_PEOPLE_CHAT_MES": {
            const myUsername = localStorage.getItem("username");
            let rawList: any[] = [];
            let partnerName = currentChatTarget?.name;
            if (Array.isArray(response.data)) {
                rawList = response.data;
                if (!partnerName && rawList.length > 0) {
                    partnerName = rawList[0].name === myUsername ? rawList[0].to : rawList[0].name;
                }
            }
            if (!partnerName) break;
            const conversationId = getConversationId(partnerName, 0);
            const messages: Message[] = rawList.map(item => {
                let timeStr = "";
                let dateStr = "";
                if (item.createAt) {
                    const parts = item.createAt.split(" ");
                    dateStr = parts[0] || "";
                    timeStr = parts[1] ? parts[1].slice(0, 5) : item.createAt;
                }
                return {
                    id: String(item.id),
                    senderId: item.name,
                    text: decodeEmoji(item.mes),
                    time: timeStr,
                    date: dateStr,
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
                const callback = checkUserExist;
                checkUserExist = null;
                callback(response.data?.status === true);
            }
            break;
        }
        default:
            break;
    }
}