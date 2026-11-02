import User, {type UserItem} from "./User.tsx";
import { useDispatch } from "react-redux";
import avatarImg from '../../assets/woman_7185906.png'
import {setActiveConversation} from "../../store/slices/chatSlice.tsx";

interface ListUserProps {
    onSelectUser?: (user: any) => void;
    selectedUser?: any;
}

export default function ListUser({ onSelectUser, selectedUser }: ListUserProps) {
    const dispatch = useDispatch();
    const users : UserItem[]= [
        {
            id: 1,
            name: "Lai Thi Hoa",
            img: avatarImg,
            lastMessage: "Hello, how r u?",
            time: "20:00",
            isOnline: true,
            unreadCount: 2
        },
        {
            id: 2,
            name: "Phung Thi Minh Thu",
            img: avatarImg,
            lastMessage: "Hello",
            time: "19:00",
            isOnline: false,
            unreadCount: 1
        },
        {
            id: 3,
            name: "Than Van Danh",
            img: avatarImg,
            lastMessage: "Hello",
            time: "18:00",
            isOnline: true,
            unreadCount: 0
        }
    ];
    const handleSelect = (user: UserItem) => {
        dispatch(setActiveConversation(user.id));
        onSelectUser?.(user);
    }
    return (
        <>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.name} onClick={() => handleSelect?.(user)}>
                        <User user={user} isSelected={selectedUser?.name === user.name}/>
                    </div>
                ))}
            </div>
        </>
    )
}