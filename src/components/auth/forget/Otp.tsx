import "./Forget.css"
export default function OTP(){
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
                    <button id="confirm">Xác nhận</button>
                </div>
            </div>
        </>
    )
}