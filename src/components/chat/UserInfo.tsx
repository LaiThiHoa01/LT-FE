import "./UserInfo.css";
import defaultAvatar from "../../assets/woman_7185906.png";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {closeInfo} from "../../store/slices/chatSlice.ts";
import {sendOutRoom} from "../../services/roomService.ts";

export default function UserInfo() {
    const dispatch = useAppDispatch();
    const activeTarget = useAppSelector((state) => state.chat.activeTarget);

    const userName = activeTarget?.name || "User";
    const userImg = activeTarget?.img || defaultAvatar;
    const isRoom = activeTarget?.type === 1;
    const handleLeaveRoom = () => {
        if (!activeTarget) return;
        const confirmLeave = window.confirm(`Bạn có chắc muốn rời nhóm "${activeTarget.name}" không?`);
        if (confirmLeave) {
            sendOutRoom(activeTarget.name);
            dispatch(closeInfo());
        }
    };
    return (
        <div className="chat-info-panel">
            <div className="panel-header">
                <h3>Thông tin hội thoại</h3>
                <button className="panel-close-btn" onClick={()=> dispatch(closeInfo())} title="Đóng">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="panel-body">
                <div className="panel-profile">
                    {isRoom ? (
                        <div className="room-avatar-big">
                            <i className="fa-solid fa-users"></i>
                        </div>
                    ) : (
                        <img src={userImg} alt={userName} className="big-avatar"/>
                    )}
                    <h4 className="profile-name">{userName}</h4>
                    <span className={`profile-status ${isRoom ? "" : (activeTarget?.isOnline ? "online" : "offline")}`}>
                        {isRoom ? "Nhóm trò chuyện" : (activeTarget?.isOnline?"Đang hoạt động":"Không hoạt động")}
                    </span>
                </div>
                <div className="panel-quick-actions">
                    <button className="quick-btn">
                        <i className="fa-regular fa-bell-slash"></i>
                        <span>Tắt thông báo</span>
                    </button>
                    {isRoom ? (
                        <button className="quick-btn danger" onClick={handleLeaveRoom}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Rời nhóm</span>
                        </button>
                        ) : (
                        <button className="quick-btn danger">
                            <i className="fa-solid fa-ban"></i>
                            <span>Chặn tin nhắn</span>
                        </button>)}
                </div>
                <div className="panel-section">
                    <div className="section-title">
                        <span>Hình ảnh / Media</span>
                        <span className="count">0 ảnh</span>
                    </div>
                    <div className="empty-state">
                        <i className="fa-regular fa-image"></i>
                        <span>Chưa có hình ảnh nào</span>
                    </div>
                </div>
                <div className="panel-section">
                    <div className="section-title">
                        <span>Tài liệu đã chia sẻ</span>
                        <span className="count">0 file</span>
                    </div>
                    <div className="empty-state">
                        <i className="fa-regular fa-folder-open"></i>
                        <span>Chưa có tài liệu nào</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
