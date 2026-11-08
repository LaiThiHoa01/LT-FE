import {sendJsonMessage} from "./websocketService.ts"
import type {RoomUserItem} from "../types/chat.ts";
import {setOnlineStatus, setUserlist} from "../store/slices/chatSlice.ts";
import {store} from "../store/store.ts";

let currentUser : string | null = null;

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
        default:
            break;
    }
}