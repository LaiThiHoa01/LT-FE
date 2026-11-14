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
        let active = true;
        socket = new WebSocket(
            "wss://chat.longapp.io.vn/chat/chat"
        );
        socket.onopen = () => {
            if (active)
                console.log("đã kết nối");
            if (window.location.pathname.includes("/chat")) {
                const username = localStorage.getItem("username");
                const password = localStorage.getItem("RE_LOGIN_CODE");
                if (username && password) {
                    reLoginAPI(username, password);
                }
            }
        };
        socket.onmessage = (event) => {
            if (!active) return;
            let response: any;
            try {
                response = JSON.parse(String(event.data));
            } catch {
                return;
            }
            console.log("dữ liệu", response);
            if (response.event === 'CREATE_ROOM') {
                const name = typeof response.data === 'string' ? response.data : response.data?.name;
                if (response.status === 'success' && typeof name === 'string' && name.trim()) {
                    store.dispatch(addRoom(name.trim()));
                    sendGetUserList();
                } else {
                    const message = typeof response.mes === 'string' ? response.mes : 'Tạo phòng thất bại.';
                    window.alert(message);
                }
            }
            if (response.event === 'JOIN_ROOM') {
                if (response.status === 'success') {
                    const roomName = typeof response.data === 'string' ? response.data : response.data?.name;
                    if (roomName) {
                        store.dispatch(addRoom(roomName));
                    }
                    sendGetUserList();
                } else {
                    const message = typeof response.mes === 'string' ? response.mes : 'Tham gia phòng thất bại.';
                    window.alert(message);
                }
            }
            if (response.event === 'OUT_ROOM') {
                if (response.status === 'success') {
                    sendGetUserList();
                } else {
                    const message = typeof response.mes === 'string' ? response.mes : 'Rời phòng thất bại.';
                    window.alert(message);
                }
            }
            if (response.event === "RE_LOGIN" && response.status === "error") {
                console.warn("Phiên đăng nhập hết hạn", response.mes);
                localStorage.removeItem("RE_LOGIN_CODE");
                localStorage.removeItem("username");
                if (window.location.pathname.includes("/chat")) {
                    window.location.replace("/login");
                }
                return;
            }
            // const response = JSON.parse(event.data);
            if(response.event === "LOGIN" ||response.event ==="RE_LOGIN" && response.status === "success") {
                const code =response.data?.RE_LOGIN_CODE
                if(code){
                    localStorage.setItem("RE_LOGIN_CODE", code);
                }
                sendGetUserList();
            }
            if (response.event === "LOGIN") {
                for (const callback of loginLis) {
                    callback(response);
                }
                loginLis.length = 0;
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