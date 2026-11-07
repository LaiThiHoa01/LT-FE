import {sendJsonMessage} from "./websocket.ts"

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
export function sendCheckUserOnline(){
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "CHAT_CHECK_USER_ONLINE",
            data: {
                user: "ti",
            }
        }
    })
}