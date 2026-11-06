import './App.css'
import { BrowserRouter,Routes, Route} from 'react-router';
import Profile from "./profile/Profile.tsx";
import Sidebar from "./components/chat/Sidebar.tsx";
import ResetPass from "./profile/ResetPass.tsx";
// import { useState } from "react";
// import avatarImg from './assets/woman_7185906.png';
import Conversation from "./components/chat/Conversation.tsx";
import SignIn from "./components/auth/signIn/SignIn.tsx";
import SignUp from "./components/auth/signUp/SignUp.tsx";
import Forget from "./components/auth/forget/Forget.tsx";
import OTP from "./components/auth/forget/Otp.tsx";
import Reset from "./components/auth/forget/Reset.tsx";
import UserInfo from "./components/chat/UserInfo.tsx";
import {useWebSocket} from "./services/websocket.ts";
import {useAppSelector} from "./store/store.ts";

function ChatLayout() {
    const isInfoOpen = useAppSelector(state => state.chat.isInfoOpen);

    return (
        <>
            <div className="app-layout">
                <aside className="sidebar-container">
                    <Sidebar />
                </aside>
                <div className="main-content">
                    <Conversation />
                </div>
                {isInfoOpen && (<UserInfo />)}
            </div>
        </>
    );
}
function App(){
    useWebSocket();
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn />} />
                <Route path="index" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="login" element={<ChatLayout />} />
                <Route path="forget" element={<Forget />} />
                <Route path="logout" element={<Profile />} />
                <Route path="profile" element={<Profile />} />
                <Route path="convervation" element={<Conversation />} />
                <Route path="sideBar" element={<Sidebar />} />
                <Route path="profile" element={<Profile />} />
                <Route path="otp" element={<OTP />} />
                <Route path="reset" element={<Reset />} />
                <Route path="resetPass" element={<ResetPass />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
