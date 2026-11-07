import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import avatar from '../../assets/woman_7185906.png';
import type {ChatState, Message, UserItem, RoomUserItem, ChatType} from '../../types/chat';

export function getConversationId(name: string, type: ChatType): string {
    return JSON.stringify([name, type]);
}
const hoaId = getConversationId('Lai Thi Hoa', 0);
const danhId = getConversationId('Than Văn Danh', 0);

const initialUser : UserItem[] = [
    { id: hoaId, name: 'Lai Thi Hoa',type:0, img: avatar, isOnline: true, unreadCount: 2, lastMessage: 'Hello, how r u?', time: '20:00 PM' },
    { id: danhId, name: 'Than Văn Danh',type:0, img: avatar, isOnline: true, unreadCount: 1, lastMessage: 'Hello, how r u?', time: '9:00 PM' }]
const initialState: ChatState = {
    users: initialUser,
    activeConversationId: hoaId,
    activeTarget: {...initialUser[0]},
    messagesByUser: {
        [hoaId]: [{ id: 'm1', senderId: 1, text: 'Hello, how r u?', time: '20:00 PM', isMe: false }],
        [danhId]: [{ id: 'm2', senderId: 1, text: 'Hello, how r u?', time: '(9:00 PM', isMe: false }],
    },
    isInfoOpen: false,
};
function selectConversation(state: ChatState, id: string) {
    const user = state.users.find(item => item.id === id);
    if (!user) return;
    user.unreadCount = 0;
    state.activeConversationId = id;
    state.activeTarget = { ...user };
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action: PayloadAction<string>) => {
            selectConversation(state, action.payload) ;
        },
        setActiveTarget:(state, action: PayloadAction<UserItem>) => {
            selectConversation(state, action.payload.id) ;

        },
        setUserlist: (state, action: PayloadAction<RoomUserItem[]>) => {
            const prevUsers = state.users;
            state.users = action.payload.map(item => {
                const id = getConversationId(item.name, item.type);
                const previous = prevUsers.find(user => user.id === id);
                return {
                    id,
                    name: item.name,
                    type: item.type,
                    img: previous?.img ?? avatar,
                    isOnline: item.isOnline ?? previous?.isOnline ?? false,
                    unreadCount: previous?.unreadCount ?? 0,
                    lastMessage: previous?.lastMessage,
                    time: previous?.time ?? item.actionTime,
                };
            })
            const activeUser = state.users.find(
                user => user.id === state.activeConversationId
            ) ?? state.users[0];

            state.activeConversationId = activeUser?.id ?? null;
            state.activeTarget = activeUser ? { ...activeUser } : null;
        },
        setOnlineStatus: (state, action: PayloadAction<{ name: string; isOnline: boolean }>) => {
            const { name, isOnline } = action.payload;
            const id = getConversationId(name, 0);
            const user = state.users.find(item => item.id === id);
            if (!user) return;
            user.isOnline = isOnline;
            if (state.activeConversationId === id) {
                state.activeTarget = { ...user };
            }
        },
        addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
            const { conversationId, message } = action.payload;
            const text = message.text.trim();
            if (!text) return;
            const messages = state.messagesByUser[conversationId] ??= [];
            messages.push({...message, text});
            const user = state.users.find(u => u.id === conversationId);

            if (!user) return;
            user.lastMessage = text;
            user.time = message.time
        },
        toggleInfo: (state) => { 
            state.isInfoOpen = !state.isInfoOpen; 
        },
        closeInfo: (state) => { 
            state.isInfoOpen = false; 
        },
        openInfo: (state) => {
            state.isInfoOpen = true;
        },
    },
});

export const { setActiveConversation,setActiveTarget, setUserlist, setOnlineStatus, addMessage, toggleInfo, closeInfo, openInfo } = chatSlice.actions;
export default chatSlice.reducer;