import "./User.css"
import type { UserItem } from "../../types/chat";

export default function User({user, isSelected}: { user: UserItem; isSelected?: boolean }) {
    return (
        <>
            <div className={`card-user ${isSelected ? "active" : ""}`}>
                <div className="card-avatar-box">
                    <img src={user.img} alt={user.name} className="card-avatar-img" />
                    {user.isOnline && (
                        <span className="card-online-dot" title="Đang online"></span>
                    )}
                </div>
                <div className="card-info-box">
                    <div className="card-row-top">
                        <span className="card-user-name">{user.name}</span>
                        <span className="card-msg-time">{user.time}</span>
                    </div>

                    <div className="card-row-bottom">
                    <span className={`card-last-msg ${user.unreadCount > 0 ? "unread" : ""}`}>
                        {user.lastMessage}
                    </span>
                        {user.unreadCount > 0 && (
                            <span className="card-unread-badge">{user.unreadCount}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}