import { useEffect } from "react";
import {handleChatUser, sendGetUserList} from "./chatService.ts";

import {store} from "../store/store.ts";
import {addRoom} from "../store/slices/chatSlice.ts";
import {reLoginAPI} from "./authService.ts";
let socket: WebSocket | null = null;
export interface loginResponse{
    status: "success" | "error";
    event: "LOGIN";
    data?: {
        RE_LOGIN_CODE: string;
    };
    mes?: string;
}
const loginLis: ((res: loginResponse)=>void) [] = [];
export function listenLogin(callback:(res: loginResponse)=>void) {
    loginLis.push(callback);
}

export function useWebSocket() {
    useEffect(() => {
        var active = true;
        socket = new WebSocket(
            "wss://chat.longapp.io.vn/chat/chat"
        );
        socket.onopen = () => {
            if (active)
                console.log("đã kết nối");
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("RE_LOGIN_CODE");
            if(username && password){
                reLoginAPI(username, password);
            }
        };
        socket.onmessage = (event) => {
            if (active)
                console.log("dữ liệu", event.data);
            const res= JSON.parse(event.data) as loginResponse;
            if(res.event == "LOGIN"){
                for (const callback of loginLis) {
                    callback(res);
                }
                loginLis.length = 0;
            }
            let reply;
            try {
                reply = JSON.parse(String(event.data));
                    } catch {
                        return;
                }
            if (reply?.event === 'CREATE_ROOM') {
                const name = reply.data?.name;
                if (reply.status === 'success' && typeof name === 'string' && name.trim()) {
                    store.dispatch(addRoom(name));
                } else {
                    const message = typeof reply.mes === 'string' ? reply.mes : 'Tạo phòng thất bại.';
                    window.alert(message);
                }
}
            const response = JSON.parse(event.data);
            if(response.event === "LOGIN" || response.event ==="RE_LOGIN" && response.status === "success") {
                if (response.data === "RE_LOGIN_CODE") {
                    localStorage.setItem("RE_LOGIN_CODE", response.data.RE_LOGIN_CODE);
                }
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