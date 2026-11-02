import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import avatar from '../../assets/woman_7185906.png';
import type { ChatState, Message } from '../../types/chat';
const initialState: ChatState = {
    users: [
        { id: 1, name: 'Lai Thi Hoa', img: avatar, isOnline: true, unreadCount: 2, lastMessage: 'Hello, how r u?', time: '20:00' },
    ],
    activeConversationId: 1,
    messagesByUser: {
        1: [{ id: 'm1', senderId: 1, text: 'Hello, how r u?', time: '20:00', isMe: false }],
    },
    isInfoOpen: false,
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action: PayloadAction<number>) => {
            state.activeConversationId = action.payload;
            const user = state.users.find(u => u.id === action.payload);
            if (user) user.unreadCount = 0;
        },
        addMessage: (state, action: PayloadAction<{ conversationId: number; message: Message }>) => {
            const { conversationId, message } = action.payload;
            if (!message.text.trim()) return;
            (state.messagesByUser[conversationId] ??= []).push({
                ...message,
                text: message.text.trim()
            });
        },
        toggleInfo: (state) => { state.isInfoOpen = !state.isInfoOpen; },
        closeInfo: (state) => { state.isInfoOpen = false; },
    },
});

export const { setActiveConversation, addMessage, toggleInfo, closeInfo } = chatSlice.actions;
export default chatSlice.reducer;