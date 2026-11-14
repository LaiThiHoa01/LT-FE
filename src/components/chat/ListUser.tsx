import User from "./User.tsx";
import type { UserItem } from "../../types/chat.ts";
import {setActiveTarget} from "../../store/slices/chatSlice.ts";
import {useAppSelector, useAppDispatch} from "../../store/store.ts";
import "./ListUser.css"
import {useState} from "react";
import {sendGetPeopleMessages} from "../../services/chatService.ts";

export default function ListUser({ search = '' }: { search?: string }) {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.chat.users);
    const activeTarget = useAppSelector((state) => state.chat.activeTarget);
    // const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const [filter, setFilter] = useState<'all' | 'user' | 'room'>('all');

    const handleSelect = (user: UserItem) => {
        dispatch(setActiveTarget(user));
        sendGetPeopleMessages(user.name.trim(), 1, user.type);
    };
    const filteredUsers = users.filter((user) => {
        const matchType = filter === 'all' || (filter === 'user' ? user.type === 0 : user.type === 1);
        const matchSearch = user.name.toLowerCase().includes(search.toLowerCase().trim());
        return matchType && matchSearch;
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