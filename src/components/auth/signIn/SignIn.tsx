import "./SignIn.css"
import { useNavigate } from "react-router";
import {useEffect, useRef, useState} from "react";
import {loginAPI} from "../../../services/authService.ts";
import {listenLogin} from "../../../services/websocket.ts";
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
                setLoginError(res.mes ?? "a");
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
            <div className="signIn">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu"/>
                </div>
                <div className="btn">
                    <button id="signIn" onClick={handleLogin}>Đăng nhập</button>
                    {/*<button id="forget" onClick={() => navigate('/forget')}>Quên mật khẩu</button>*/}
                </div>
                {loginError && <p>{loginError}</p>}
                <div className="bottom">
                    <button id="signUp" onClick={() => navigate('/signUp') }>Tạo tài khoản mới</button>
                </div>
            </div>
        </>
    )
}