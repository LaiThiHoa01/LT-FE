export interface ChatUser {
    id: number;
    name: string;
    img: string;
    isOnline: boolean;
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
    activeConversationId: number | null;
    messagesByUser: Record<number, Message[]>;
    isInfoOpen: boolean;
}
