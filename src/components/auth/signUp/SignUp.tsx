import "./SignUp.css"
import "../Auth.css"
import {useNavigate} from "react-router";
import {type FormEvent, useEffect, useState} from "react";
import {registerAPI} from "../../../services/authService.ts";
import {listenRegister} from "../../../services/websocketService.ts";
export default function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

    useEffect(()=>{
        listenRegister((res)=>{
            if(res.status=="success"){
                navigate("/login");
            }else{
                setError(res.mes??"Dang ky that bai");
            }
        })
    },[navigate]);
    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const us=username.trim();
        if(!us||!password||!confirmPass){
            setError("Vui lòng nhập đầy đủ các thông tin");
            return;
        }
        if(password.length<6){
            setError("Mật khẩu có ít nhất 6 ký tự");
            return;
        }
        if(password!=confirmPass){
            setError("Mật khẩu xác nhận không khớp");
            return;
        }
        const send = registerAPI(us, password);
        if(!send){
            setError("Websocket chưa sẳn sàng")
        }
        // navigate("/login");
    }

    return (
        <>
            <div className="auth">
                <div className="title">
                    <h1 className="nameTitle">APP CHAT</h1>
                </div>
                <form onSubmit={handleRegister}>
                <div className="divInput">
                    <div className="divname">
                        <span className="spanSign">User name: </span>
                        <input className="inputAuth" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nhập username của bạn" title="Gồm chữ cái không dấu, số và dấu gạch dưới" pattern="[A-Za-z0-9_]+" required/>
                    </div>
                    <div className="pass">
                        <span className="spanSign">Mật khẩu: </span>
                        <input className="inputAuth" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Nhập mật khẩu của bạn" required/>
                    </div>
                    <div className="passAgain">
                        <span className="spanSign">Xác nhận lại mật khẩu: </span>
                        <input className="inputAuth" type="password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} placeholder="Nhập lại mật khẩu của bạn" required/>
                    </div>
                    <button className="btnAuth" id="signUp">Đăng ký</button>
                </div>
                </form>
                <div className="divBtn">
                    <button className="btnAuth" id="had" onClick={() => navigate('/login')}>Tôi đã có tài khoản</button>
                </div>
                {error!=""?<p>{error}</p>:null}
            </div>
        </>
    )
}