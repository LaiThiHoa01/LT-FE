import "./Profile.css"
export default function Profile(){
    return (
        <>
            <div className="profile">
                <h1>Thông tin cá nhân</h1>
                <div className="avt">
                    <img src="src/assets/avt.png" alt="avt"/>
                    <button id="btnAvt">Đổi ảnh đại diện</button>
                </div>
                <div className="detail">
                    <div className="name">
                        <span>Họ và tên: </span>
                        <input type="text" value="Phùng Thị Minh Thư" placeholder="Nhập họ và tên của bạn"/>
                    </div>
                    <div className="email">
                        <span>Email: </span>
                        <input type="email" value="23130317@st.hcmuaf.edu.vn" placeholder="Nhập email của bạn"/>
                    </div>
                    <div className="sdt">
                        <span>Số di động: </span>
                        <input type="number" value="0123456789" placeholder="Nhập sdt của bạn"/>
                    </div>
                    <div className="pass">
                        <span>Mật khẩu: </span>
                        <input type="password" value="********" placeholder="Nhập mật khẩu của bạn"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="btnLogout">Đăng xuất</button>
                    <button id="btnUpdate">Cập nhật</button>
                </div>
            </div>
        </>
    )
}