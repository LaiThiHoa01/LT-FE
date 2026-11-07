import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import avatar from '../../assets/woman_7185906.png';
import type {ChatState, Message, UserItem, RoomUserItem} from '../../types/chat';

const initialUser : UserItem[] = [
    { id: 1, name: 'Lai Thi Hoa', img: avatar, isOnline: true, unreadCount: 2, lastMessage: 'Hello, how r u?', time: '20:00 PM' },
    { id: 2, name: 'Than Văn Danh', img: avatar, isOnline: true, unreadCount: 1, lastMessage: 'Hello, how r u?', time: '9:00 PM' }]
const initialState: ChatState = {
    users: initialUser,
    activeConversationId: 1,
    activeTarget: initialUser[0],
    messagesByUser: {
        1: [{ id: 'm1', senderId: 1, text: 'Hello, how r u?', time: '20:00 PM', isMe: false }],
        2: [{ id: 'm2', senderId: 1, text: 'Hello, how r u?', time: '(9:00 PM', isMe: false }],
    },
    isInfoOpen: false,
    userList: [],
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action: PayloadAction<number>) => {
            state.activeConversationId = action.payload;
            const user = state.users.find(u => u.id === action.payload);
            if (user){
                user.unreadCount = 0;
                state.activeTarget = user;
            }
        },
        setActiveTarget:(state, action: PayloadAction<UserItem>) => {
            state.activeTarget = action.payload;
            state.activeConversationId = action.payload.id;
            const user = state.users.find(u => u.id === action.payload.id);
            if(user){
                user.unreadCount = 0;
            }
        },
        setUserlist: (state, action: PayloadAction<RoomUserItem[]>) => {
            state.userList = action.payload;
        },
        setOnlineStatus: (state, action: PayloadAction<{ name: string; isOnline: boolean }>) => {
            const item = state.userList.find(u => u.name === action.payload.name);
            if(item) {
                item.isOnline = action.payload.isOnline;
            }
        },
        addMessage: (state, action: PayloadAction<{ conversationId: number; message: Message }>) => {
            const { conversationId, message } = action.payload;
            if (!message.text.trim()) return;
            if (!state.messagesByUser[conversationId]) {
                state.messagesByUser[conversationId] = [];
            }
            state.messagesByUser[conversationId].push({
                ...message,
                text: message.text.trim()
            });
            const user = state.users.find(u => u.id === conversationId);
            if (user) {
                user.lastMessage = message.text.trim();
                user.time = message.time;
            }
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