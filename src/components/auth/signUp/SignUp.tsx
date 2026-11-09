import "./SignUp.css"
import "../Auth.css"
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
            <div className="auth">
                <div className="title">
                    <h1 className="nameTitle">APP CHAT</h1>
                </div>
                <div className="divInput">
                    <div className="divname">
                        <span className="spanSign">User name: </span>
                        <input className="inputAuth" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nhập username của bạn"/>
                    </div>
                    <div className="pass">
                        <span className="spanSign">Mật khẩu: </span>
                        <input className="inputAuth" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Nhập mật khẩu của bạn"/>
                    </div>
                    <div className="passAgain">
                        <span className="spanSign">Xác nhận lại mật khẩu: </span>
                        <input className="inputAuth" type="password" placeholder="Nhập lại mật khẩu của bạn"/>
                    </div>
                </div>
                <div className="divBtn">
                    <button className="btnAuth" id="signUp" onClick={handleRegister}>Đăng ký</button>
                    <button className="btnAuth" id="had" onClick={() => navigate('/login')}>Tôi đã có tài khoản</button>
                </div>
            </div>
        </>
    )
}