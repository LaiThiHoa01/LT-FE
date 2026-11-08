export interface ChatUser {
    id: string;
    name: string;
    type: ChatType;
    img: string;
    isOnline?: boolean;
    unreadCount: number;
}
export interface Message {
    id: string;
    senderId: number | string;
    text: string;
    time: string;
    isMe: boolean;
}
export interface UserItem extends ChatUser {
    lastMessage?: string;
    time?: string;
}
export interface ChatState {
    users: UserItem[];
    activeConversationId: string | null;
    activeTarget: UserItem | null;
    messagesByUser: Record<string, Message[]>;
    isInfoOpen: boolean;
}
export interface RoomUserItem{
    name: string;
    type: ChatType;
    actionTime: string;
    isOnline?: boolean;
}
export type ChatType = 0 | 1;
