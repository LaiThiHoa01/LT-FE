import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import avatar from '../../assets/woman_7185906.png';
import type {ChatState, Message, UserItem, RoomUserItem, ChatType} from '../../types/chat';

export function getConversationId(name: string, type: ChatType): string {
    return JSON.stringify([name, type]);
}
const initialState: ChatState = {
    users: [],
    activeConversationId: null,
    activeTarget: null,
    messagesByUser: {},
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
        addRoom: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            const id = getConversationId(name, 1);

            if (!state.users.some(user => user.id === id)) {
                state.users.unshift({
                    id,
                    name,
                    type: 1,
                    img: avatar,
                    isOnline: false,
                    unreadCount: 0,
                });
            }

            selectConversation(state, id);
        },
        resetChat: state => {
            state.users = [];
            state.activeConversationId = null;
            state.activeTarget = null;
            state.messagesByUser = {};
            state.isInfoOpen = false;
        },
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
        addConnectUser: (state, action: PayloadAction<string>) => {
            const name = action.payload.trim();
            if(!name) return;
            const id = getConversationId(name, 0);
            if(!state.users.some(user => user.id === id)) {
                state.users.unshift({
                    id,
                    name,
                    type: 0,
                    img: avatar,
                    isOnline: false,
                    unreadCount: 0,
                });
            }
            selectConversation(state, id);
        },
        addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
            const { conversationId, message } = action.payload;
            const text = message.text.trim();
            if (!text) return;
            const messages = state.messagesByUser[conversationId] ??= [];
            const isDuplicate = messages.some(m => m.id === message.id);
            if (!isDuplicate) {
                messages.push({ ...message, text });
            }
            let user = state.users.find(u => u.id === conversationId);
            if (!user){
                try {
                    const [name, type] = JSON.parse(conversationId);
                    user = {
                        id: conversationId,
                        name,
                        type,
                        img: avatar,
                        unreadCount: 0,
                    };
                    state.users.unshift(user);
                } catch {
                    return;
                }
            }
            user.lastMessage = text;
            user.time = message.time;
            if (!message.isMe && state.activeConversationId !== conversationId) {
                user.unreadCount = (user.unreadCount || 0) + 1;
            }
            const userIndex = state.users.findIndex(u => u.id === conversationId);
            if (userIndex > 0) {
                const [targetUser] = state.users.splice(userIndex, 1);
                state.users.unshift(targetUser);
            }
        },
        setMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
             const { conversationId, messages } = action.payload;
             state.messagesByUser[conversationId] = messages;
            if (messages.length > 0) {
                const lastMsg = messages[messages.length - 1];
                const user = state.users.find(u => u.id === conversationId);
                if (user && !user.lastMessage) {
                    user.lastMessage = lastMsg.text;
                    user.time = lastMsg.time;
                }
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

export const {addRoom, resetChat, setActiveConversation,setActiveTarget, setUserlist, setOnlineStatus,addConnectUser, addMessage, toggleInfo, closeInfo, openInfo,setMessages } = chatSlice.actions;
export default chatSlice.reducer;