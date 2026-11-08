import User from "./User.tsx";
import type { UserItem } from "../../types/chat.ts";
// import {closeInfo, setActiveConversation} from "../../store/slices/chatSlice.ts";
import {setActiveTarget} from "../../store/slices/chatSlice.ts";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";
import {sendCheckUserOnline} from "../../services/chatService.ts";
import "./ListUser.css"
export default function ListUser() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.chat.users);
    const activeTarget = useAppSelector((state) => state.chat.activeTarget);
    // const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const handleSelect = (user: UserItem) => {
        dispatch(setActiveTarget(user));
        if(user.type === 0){
            sendCheckUserOnline(user.name);
        }
    };

    return (
        <div className="user-list">
            {users.map((user) => {
                const isSelected = activeTarget?.id === user.id;
                return (
                    <div key={user.id} onClick={() => handleSelect(user)}>
                        <User user={user} isSelected={isSelected}/>
                    </div>
                );
            })}
        </div>
    );
}