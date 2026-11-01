import "./Forget.css"
import {useNavigate} from "react-router";
export default function OTP(){
    let navigate = useNavigate();
    return (
        <>
            <div className="otp">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <span>Xác nhận mã OTP: </span>
                    <div className="email">
                        <input type="number" placeholder="Nhập mã OTP"/>
                    </div>
                    <div id="error">
                        <span>MÃ OTP SAI !!! Vui lòng nhập lại</span>
                    </div>
                </div>
                <div className="btn">
                    <button id="confirm" onClick={() => navigate('/reset')}>Xác nhận</button>
                </div>
            </div>
        </>
    )
}