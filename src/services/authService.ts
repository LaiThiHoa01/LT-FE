import {getSocket} from "./websocket.ts";

export function registerAPI(username:string, password:string) {
    const socket = getSocket();
    if(!socket){
        console.error("WebSocket chua san sang");
        return;
    }
    const sendRegister = async () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    "user": username,
                    "pass": password
                }
            }
        }))
    }
    if (socket.readyState == WebSocket.OPEN) {
        sendRegister();
    }
}