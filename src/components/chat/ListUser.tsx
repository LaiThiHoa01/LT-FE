import User from "./User.tsx";
import type { UserItem } from "../../types/chat.ts";
// import {closeInfo, setActiveConversation} from "../../store/slices/chatSlice.ts";
import {setActiveTarget} from "../../store/slices/chatSlice.ts";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";
import {sendCheckUserOnline} from "../../services/chatService.ts";
import "./ListUser.css"
import {useState} from "react";
export default function ListUser() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.chat.users);
    const activeTarget = useAppSelector((state) => state.chat.activeTarget);
    // const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const [filter, setFilter] = useState<'all' | 'user' | 'room'>('all');

    const handleSelect = (user: UserItem) => {
        dispatch(setActiveTarget(user));
        if(user.type === 0){
            sendCheckUserOnline(user.name);
        }
    };
    const filteredUsers = users.filter((user) => {
        if (filter === 'user') return user.type === 0;
        if (filter === 'room') return user.type === 1;
        return true;
    });
    return (
        <div className="list-user-container">
            <div className="filter-header">
                <span>Danh sách</span>
                <select className="filter-select" value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}>
                    <option value="all">Tất cả</option>
                    <option value="user">Người</option>
                    <option value="room">Nhóm</option>
                </select>
            </div>
            <div className="user-list">
                {filteredUsers.map((user) => {
                    const isSelected = activeTarget?.id === user.id;
                    return (
                        <div key={user.id} onClick={() => handleSelect(user)}>
                            <User user={user} isSelected={isSelected}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}