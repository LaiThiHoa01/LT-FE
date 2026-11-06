import {useState} from "react";
import avatarImg from "../assets/woman_7185906.png";
import Sidebar from "../components/chat/Sidebar.tsx";
import Conversation from "../components/chat/Conversation.tsx";

export function ChatLayout(){
    const [selectedUser, setSelectedUser] = useState({
        name: "Lai Thi Hoa",
        img: avatarImg
    });
    return (
        <>
            <div className="app-layout">
                <aside className="sidebar-container">
                    <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
                </aside>
                <div className="main-content">
                    <Conversation selectedUser={selectedUser} />
                </div>
            </div>
        </>
    );
}
