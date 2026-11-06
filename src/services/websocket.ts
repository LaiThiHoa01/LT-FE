import { useEffect } from "react";

export function useWebSocket() {
    useEffect(() => {
        var active = true;
        const socket = new WebSocket(
            "wss://chat.longapp.io.vn/chat/chat"
        );
        socket.onopen = () => {
            if (active)
                console.log("đã kết nối");
        };
        socket.onmessage = (event) => {
            if (active)
                console.log("dữ liệu", event.data);
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
            socket.close();
        };
    }, []);
}