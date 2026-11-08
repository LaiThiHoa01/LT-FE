import { useEffect } from "react";
import {handleChatUser, sendGetUserList} from "./chatService.ts";

let socket: WebSocket | null = null;

export function useWebSocket() {
    useEffect(() => {
        var active = true;
        socket = new WebSocket(
            "wss://chat.longapp.io.vn/chat/chat"
        );
        socket.onopen = () => {
            if (active)
                console.log("đã kết nối");
        };
        socket.onmessage = (event) => {
            if (active)
                console.log("dữ liệu", event.data);
            const response = JSON.parse(event.data);
            if(response.event === "LOGIN" && response.status === "success") {
                sendGetUserList();
            }
            handleChatUser(response);
        };
        socket.onerror = (error) => {
            if (active)
                console.error("lỗi kết nối", error);
        };
        socket.onclose = () => {
            if (active)
                console.log("ngắt kết nối");
        };
        return () => {
            active = false;
            if(socket!=null) {
                socket.close();
            }
        };
    }, []);
}
export function sendJsonMessage(payload: object) {
    if(socket && socket.readyState == WebSocket.OPEN)
        socket.send(JSON.stringify(payload));
}
export function getSocket() {
    return socket;
}