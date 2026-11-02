import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface ChatState {
    activeConversationId: number | string | null;
}

const initialState: ChatState = {
    activeConversationId: 1
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action: PayloadAction<number | string>) => {
            state.activeConversationId = action.payload;
        }
    }
});

export const {setActiveConversation} = chatSlice.actions;
export default chatSlice.reducer;