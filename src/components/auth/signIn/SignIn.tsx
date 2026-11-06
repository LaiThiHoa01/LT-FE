import "./SignIn.css"
import { useNavigate } from "react-router";
import {useState} from "react";
import {loginAPI} from "../../../services/authService.ts";
export default function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    let navigate = useNavigate();

    function handleLogin() {
        loginAPI(username, password);
        navigate("/chat")
    }

    return (
        <>
            <div className="signIn">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu"/>
                </div>
                <div className="btn">
                    <button id="signIn" onClick={handleLogin}>Đăng nhập</button>
                    <button id="forget" onClick={() => navigate('/forget')}>Quên mật khẩu</button>
                </div>
                <div className="bottom">
                    <button id="signUp" onClick={() => navigate('/signUp') }>Tạo tài khoản mới</button>
                </div>
            </div>
        </>
    )
}