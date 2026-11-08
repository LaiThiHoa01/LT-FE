import {getSocket} from "./websocketService.ts";

export function registerAPI(username:string, password:string) {
    const socket = getSocket();
    if(!socket){
        console.error("WebSocket chua san sang");
        return;
    }
    const sendRegister = () => {
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
export function loginAPI(username: string, password: string):boolean{
    const socket = getSocket();
    if(!socket){
        console.error("WebSocket chua san sang");
        return false;
    }
    const sendLogin=  () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data:{
                event: "LOGIN",
                data: {
                    "user": username,
                    "pass": password
                }
            }
        }))
    }
    if(socket.readyState==WebSocket.OPEN){
        sendLogin();
    }
    return true;
}