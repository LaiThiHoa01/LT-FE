import User from "./User.tsx";
import type { UserItem } from "../../types/chat.ts";
// import {closeInfo, setActiveConversation} from "../../store/slices/chatSlice.ts";
import {setActiveTarget} from "../../store/slices/chatSlice.ts";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";

export default function ListUser() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.chat.users);
    const activeTarget = useAppSelector((state) => state.chat.activeTarget);
    // const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const handleSelect = (user: UserItem) => {
        dispatch(setActiveTarget(user));
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