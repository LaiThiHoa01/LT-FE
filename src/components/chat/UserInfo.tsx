import "./UserInfo.css"

export default function UserInfo() {
    return (
        <>
            <div className="overlay">
                <div className="user-info">
                    <div className="header">
                        <h2>Thông tin tài khoản</h2>
                        <i className="fa-solid fa-xmark close-btn"></i>
                    </div>
                    <div className="body-info">
                        <div className="user-card">
                            <img src="" alt=""/>
                            <div className="name">Than Van Danh</div>
                        </div>
                        <div className="info">
                            <div className="info-item">
                                <span className="label">Giới tính</span>
                                <span className="value">Nam</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Ngày sinh</span>
                                <span className="value">22/07/2005</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Điện thoại</span>
                                <span className="value">079999999</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Email</span>
                                <span className="value">vandanh2207@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="remove">Xóa bạn</button>
            </div>
        </>
    )
}