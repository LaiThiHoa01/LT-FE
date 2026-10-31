import ListUser from "./ListUser.tsx";
import "./Sidebar.css"
import avatarImg from '../../assets/woman_7185906.png'

interface SidebarProps {
    onSelectUser?: (user: any) => void;
    selectedUser?: any;
}

export default function Sidebar({ onSelectUser, selectedUser }: SidebarProps) {
    return (
        <>
            <div className="list-contact">
                <div className="sidebar-header">
                    <div className="user-profile">
                        <img src={avatarImg} alt="Avatar" className="my-avatar" />
                        <span className="my-name">Thân Văn Danh</span>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn" title="Tạo cuộc trò chuyện / nhóm mới">
                            <i className="fa-solid fa-user-plus"></i>
                        </button>
                        <button className="action-btn" title="Cài đặt">
                            <i className="fa-solid fa-gear"></i>
                        </button>
                    </div>
                </div>
                <div className="search-contact">
                    <form action="/search" method="get">
                        <input type="text" className="search-input" placeholder=""/>
                        <button className="search" type="submit"><i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                <ListUser onSelectUser={onSelectUser} selectedUser={selectedUser}/>
            </div>
        </>
    )
}