import { getSocket } from './websocketService.ts';

export function createRoomAPI(name: string) {
    const roomName = name.trim();
    if (!roomName) throw new Error('Nhập tên phòng.');

    const socket = getSocket();
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket chưa sẵn sàng.');
    }

    socket.send(JSON.stringify({
        action: 'onchat',
        data: {
            event: 'CREATE_ROOM',
            data: { name: roomName },
        },
    }));
}