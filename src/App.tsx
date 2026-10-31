import './App.css'
import Conservation from "./components/chat/Conversation.tsx";
import Sidebar from "./components/chat/Sidebar.tsx";
import { useState } from "react";
import avatarImg from './assets/woman_7185906.png';

function App() {
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
                <Conservation selectedUser={selectedUser} />
            </div>
        </div>
    </>
  )
}

export default App
