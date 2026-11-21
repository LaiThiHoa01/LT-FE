import {getSocket, sendJsonMessage} from './websocketService.ts';
import {sendGetPeopleMessages} from './chatService.ts';

let leavingRoomName: string | null = null;
const leftRooms = new Set<string>();
export function createRoomAPI(name: string) {
    const roomName = name.trim();
    if (!roomName) throw new Error('Nhập tên phòng.');

    const socket = getSocket();
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket chưa sẵn sàng.');
    }

    leftRooms.delete(roomName);
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
    const socket = getSocket();
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket chưa sẵn sàng');
    }
    leftRooms.delete(roomName);
    sendGetPeopleMessages(roomName, 1, 1);
}
export function sendOutRoom(name: string): boolean {
    const roomName = name.trim();
    if (!roomName) return false;
    if (leavingRoomName === roomName) return true;
    leavingRoomName = roomName;
    const isSent = sendJsonMessage({
        action: "onchat",
        data: {
            event: "OUT_ROOM",
            data: {
                name : roomName,
            }
        }
    });
    if (!isSent) {
        leavingRoomName = null;
    }
    return isSent;
}

export function getLeaveRoom(): string | null {
    return leavingRoomName;
}
export function clearRoom(leftRoomName?: string): void {
    if (leftRoomName?.trim()) {
        leftRooms.add(leftRoomName.trim());
    }
    leavingRoomName = null;
}
export function isRoomLeft(name: string): boolean {
    return leftRooms.has(name.trim());
}
export function resetRoomState(): void {
    leavingRoomName = null;
    leftRooms.clear();
}