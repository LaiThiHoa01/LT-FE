import { useEffect } from "react";
import {store} from "../store/store.ts";
import {addRoom} from "../store/slices/chatSlice.ts";
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

export function getSocket() {
    return socket;
}