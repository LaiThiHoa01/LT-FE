import User from "./User.tsx";
import avatarImg from '../../assets/woman_7185906.png'

export default function ListUser() {
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
                {users.map((user) => (<User user={user}/>))}
            </div>
        </>
    )

}