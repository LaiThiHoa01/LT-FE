import "./Profile.css"
import {useNavigate} from "react-router";
export default function Profile(){
    let navigate = useNavigate();
    return (
        <>
            <div className="profile">
                <h1 className="info">Thông tin cá nhân</h1>
                <div className="avt">
                    <img className="imgAvt" src="src/assets/avt.png" alt="avt"/>
                    <button className="btnProfile" id="btnAvt">Đổi ảnh đại diện</button>
                </div>
                <div className="detail">
                    <div className="divname">
                        <span className="spanProfle">Username: </span>
                        <input className="inputProfile" type="text" value="Phùng Thị Minh Thư" placeholder="Nhập họ và tên của bạn"/>
                    </div>
                    <div className="pass">
                        <span className="spanProfle">Mật khẩu: </span>
                        <div className="pw">
                            <input className="inputProfile" type="password" disabled value="********" placeholder="Nhập mật khẩu của bạn"/>
                            <button className="btnProfile" id="btnPass" onClick={() => navigate('/resetPass')}>Đổi mật khẩu</button>
                        </div>
                    </div>

                </div>
                <div className="btn">
                    <button className="btnProfile" id="btnLogout" onClick={() => navigate('/index')}>Đăng xuất</button>
                    <button className="btnProfile" id="btnUpdate" >Cập nhật</button>
                </div>
            </div>
        </>
    )
}