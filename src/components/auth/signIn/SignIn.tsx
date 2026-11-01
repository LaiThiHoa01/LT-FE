import "./SignIn.css"
import { useNavigate } from "react-router";
export default function SignIn(){
    let navigate = useNavigate();
    return (
        <>
            <div className="signIn">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <input type="text" placeholder="Số di động hoặc email"/>
                    <input type="text" placeholder="Mật khẩu"/>
                </div>
                <div className="btn">
                    <button id="signIn" onClick={() => navigate('/login')}>Đăng nhập</button>
                    <button id="forget" onClick={() => navigate('/forget')}>Quên mật khẩu</button>
                </div>
                <div className="bottom">
                    <button id="signUp" onClick={() => navigate('/signUp') }>Tạo tài khoản mới</button>
                </div>
            </div>
        </>
    )
}