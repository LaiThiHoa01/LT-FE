import "./UserInfo.css";
import defaultAvatar from "../../assets/woman_7185906.png";

interface UserInfoProps {
    selectedUser?: {
        name: string;
        img: string;
    };
    onClose: () => void;
}

export default function UserInfo({selectedUser, onClose}: UserInfoProps) {
    const userName = selectedUser?.name || "Lại Thị Hoa";
    const userImg = selectedUser?.img || defaultAvatar;

    return (
        <div className="chat-info-panel">
            <div className="panel-header">
                <h3>Thông tin hội thoại</h3>
                <button className="panel-close-btn" onClick={onClose} title="Đóng">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="panel-body">
                <div className="panel-profile">
                    <img src={userImg} alt={userName} className="big-avatar"/>
                    <h4 className="profile-name">{userName}</h4>
                    <span className="profile-status">Đang hoạt động</span>
                </div>
                <div className="panel-quick-actions">
                    <button className="quick-btn">
                        <i className="fa-regular fa-bell-slash"></i>
                        <span>Tắt thông báo</span>
                    </button>
                    <button className="quick-btn danger">
                        <i className="fa-solid fa-ban"></i>
                        <span>Chặn tin nhắn</span>
                    </button>
                </div>
                <div className="panel-section">
                    <div className="section-title">
                        <span>Hình ảnh / Media</span>
                        <span className="count">4 ảnh</span>
                    </div>
                    <div className="media-grid">
                        <img src={userImg} alt="1"/>
                        <img src={userImg} alt="2"/>
                        <img src={userImg} alt="3"/>
                        <img src={userImg} alt="4"/>
                    </div>
                </div>
                <div className="panel-section">
                    <div className="section-title">
                        <span>Tài liệu đã chia sẻ</span>
                        <span className="count">2 file</span>
                    </div>
                    <div className="shared-files-list">
                        <div className="file-item">
                            <i className="fa-solid fa-file-pdf file-icon pdf"></i>
                            <div className="file-info">
                                <span className="file-name">BaoCao_CuoiKy_LTFE.pdf</span>
                                <span className="file-size">2.4 MB • 28/10/2026</span>
                            </div>
                        </div>
                        <div className="file-item">
                            <i className="fa-solid fa-file-lines file-icon docs"></i>
                            <div className="file-info">
                                <span className="file-name">PhanCongNhiemVu.docx</span>
                                <span className="file-size">540 KB • Hôm qua</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}