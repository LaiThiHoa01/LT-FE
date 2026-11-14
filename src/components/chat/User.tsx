import "./User.css"
import type { UserItem } from "../../types/chat";

export default function User({user, isSelected}: { user: UserItem; isSelected?: boolean }) {
    const formatTime = (timeString?: string) => {
        if (!timeString) return "";
        const actionTime = new Date(timeString.replace(" ", "T")).getTime();

        if (isNaN(actionTime)) return timeString;
        const now = Date.now();
        const elapsedTime = now - actionTime;

        if (elapsedTime < 0) return "Vừa xong";
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years =  Math.floor(days / 365);

        if (years >= 1) return `${years} năm`;
        if (months >= 1) return `${months} tháng`;
        if (days >= 1) return `${days} ngày`;
        if (hours >= 1) return `${hours} tiếng`;
        if (minutes >= 1) return `${minutes} phút`;
        return "Vừa xong";
    };
    const isRoom = user.type === 1;
    return (
        <>
            <div className={`card-user ${isSelected ? "active" : ""}`}>
                <div className={`card-avatar-box ${isRoom ? "room-avatar" : ""}`}>
                    {isRoom ? (
                        <div className="room-icon-placeholder">
                            <i className="fa-solid fa-users"></i>
                        </div>
                    ) : (
                        <img src={user.img} alt={user.name} className="card-avatar-img" />
                    )}
                    {!isRoom && user.isOnline && (
                        <span className="card-online-dot" title="Đang online"></span>
                    )}
                </div>
                <div className="card-info-box">
                    <div className="card-row-top">
                        <span className="card-user-name">{user.name}</span>
                        <span className="card-msg-time">{formatTime(user.time)}</span>
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