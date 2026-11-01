import "./Forget.css"
import {useNavigate} from "react-router";
export default function Reset(){
    let navigate = useNavigate();
    return (
        <>
            <div className="confirm">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <span>Nhập mật khẩu mới: </span>
                    <div className="newPass">
                        <input type="number" placeholder="Nhập mật khẩu mới"/>
                    </div>
                    <span>Nhập lại mật khẩu: </span>
                    <div className="newPassAgain">
                        <input type="number" placeholder="Nhập lại mật khẩu"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="reset" onClick={() => navigate('/index')}>Xác nhận</button>
                </div>
            </div>
        </>
    )
}