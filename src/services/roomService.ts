import {getSocket, sendJsonMessage} from './websocketService.ts';
import {sendGetPeopleMessages} from './chatService.ts';

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
export function sendJoinRoom(name: string) {
    const roomName = name.trim();
    if (!roomName) return;
    sendGetPeopleMessages(roomName, 1, 1);
}
let leavingRoomName: string | null = null;
export function sendOutRoom(name: string) {
    const roomName = name.trim();
    if (!roomName) return;
    leavingRoomName = roomName;
    sendJsonMessage({
        action: "onchat",
        data: {
            event: "OUT_ROOM",
            data: {
                name : roomName,
            }
        }
    });
}

export function getLeaveRoom(): string | null {
    return leavingRoomName;
}
export function clearRoom(): void {
    leavingRoomName = null;
}