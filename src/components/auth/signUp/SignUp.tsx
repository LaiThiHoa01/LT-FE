import "./SignUp.css"
import {useNavigate} from "react-router";
import {useState} from "react";
import {registerAPI} from "../../../services/authService.ts";
export default function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function handleRegister() {
        registerAPI(username, password);
        navigate("/login");
    }

    return (
        <>
            <div className="signUp">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <div className="divname">
                        <span>Họ và tên: </span>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nhập họ và tên của bạn"/>
                    </div>
                    <div className="email">
                        <span>Email: </span>
                        <input type="email" placeholder="Nhập email của bạn"/>
                    </div>
                    <div className="sdt">
                        <span>Số di động: </span>
                        <input type="number" placeholder="Nhập sdt của bạn"/>
                    </div>
                    <div className="pass">
                        <span>Mật khẩu: </span>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Nhập mật khẩu của bạn"/>
                    </div>
                    <div className="passAgain">
                        <span>Xác nhận lại mật khẩu: </span>
                        <input type="password" placeholder="Nhập lại mật khẩu của bạn"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="signUp" onClick={handleRegister}>Đăng ký</button>
                    <button id="had" onClick={() => navigate('/login')}>Tôi đã có tài khoản</button>
                </div>
            </div>
        </>
    )
}