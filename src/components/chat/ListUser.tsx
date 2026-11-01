import User from "./User.tsx";
import avatarImg from '../../assets/woman_7185906.png'

interface ListUserProps {
    onSelectUser?: (user: any) => void;
    selectedUser?: any;
}

export default function ListUser({ onSelectUser, selectedUser }: ListUserProps) {
    const users = [
        {
            name: "Lai Thi Hoa",
            img: avatarImg
        },
        {
            name: "Phung Thi Minh Thu",
            img: avatarImg
        },
        {
            name: "Than Van Danh",
            img: avatarImg
        }
    ]
    return (
        <>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.name} onClick={() => onSelectUser?.(user)}>
                        <User user={user} isSelected={selectedUser?.name === user.name}/>
                    </div>
                ))}
            </div>
        </>
    )
}