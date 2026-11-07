// import {useState} from "react";
// import avatarImg from "../assets/woman_7185906.png";
import Sidebar from "../components/chat/Sidebar.tsx";
import Conversation from "../components/chat/Conversation.tsx";
import {useAppSelector} from "../store/store.ts";
import UserInfo from "../components/chat/UserInfo.tsx";

export function ChatLayout(){
    const isOpenInfo = useAppSelector((state)=> state.chat.isInfoOpen)
    return (
        <>
            <div className="app-layout">
                <aside className="sidebar-container">
                    <Sidebar />
                </aside>
                <div className="main-content">
                    <Conversation />
                </div>
                {isOpenInfo && (<UserInfo />)}
            </div>
        </>
    );
}
