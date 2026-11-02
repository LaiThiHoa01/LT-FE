import User from "./User.tsx";
import type { UserItem } from "../../types/chat.ts";
import {setActiveConversation} from "../../store/slices/chatSlice.ts";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";

interface ListUserProps {
    onSelectUser?: (user: any) => void;
    selectedUser?: any;
}

export default function ListUser({ onSelectUser, selectedUser }: ListUserProps) {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.chat.users);
    const handleSelect = (user: UserItem) => {
        dispatch(setActiveConversation(user.id));
        onSelectUser?.(user);
    }
    return (
        <>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.id} onClick={() => handleSelect?.(user)}>
                        <User user={user} isSelected={selectedUser?.name === user.name}/>
                    </div>
                ))}
            </div>s
        </>
    )
}