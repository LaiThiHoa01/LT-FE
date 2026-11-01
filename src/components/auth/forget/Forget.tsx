import "./Forget.css"
import {useNavigate} from "react-router";
export default function Forget(){
    let navigate = useNavigate();
    return (
        <>
            <div className="forget">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <span>Email: </span>
                    <div className="emailForget">
                        <input type="email" placeholder="Nhập email"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="send" onClick={() => navigate('/otp')}>Gửi</button>
                </div>
            </div>
        </>
    )
}