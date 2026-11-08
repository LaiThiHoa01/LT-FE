import "./SignIn.css"
import "../Auth.css"
import { useNavigate } from "react-router";
import {useEffect, useRef, useState} from "react";
import {loginAPI} from "../../../services/authService.ts";
import {listenLogin} from "../../../services/websocketService.ts";
export default function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const [loginError, setLoginError]= useState("");
    const sendUser = useRef("");
    let navigate = useNavigate();

    useEffect(() => {
        listenLogin(res =>{
            if(!sendUser.current) return;
            sendUser.current = "";
            if(res.status =="success"){
                navigate("/chat");
            } else {
                setLoginError(res.mes ?? "Dang nhap that bai");
                console.log("Dang nhap that bai");
            }
        });
    }, [navigate]);
    function handleLogin() {
        setLoginError("");
        sendUser.current = username;
        const send = loginAPI(username, password);
        if(!send){
            sendUser.current = "";
            setLoginError("WebSocket chua san sang")
        }
    }

    return (
        <>
            <div className="auth">
                <div className="title">
                    <h1 className="nameTitle">APP CHAT</h1>
                </div>
                <div className="divInput">
                    <input className="inputAuth" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nhập username"/>
                    <input className="inputAuth" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu"/>
                </div>
                <div className="divBtn">
                    <button className="btnAuth" id="signIn" onClick={handleLogin}>Đăng nhập</button>
                    <button className="btnAuth" id="signUp" onClick={() => navigate('/signUp') }>Tạo tài khoản mới</button>
                </div>
                {loginError && <p>{loginError}</p>}
            </div>
        </>
    )
}