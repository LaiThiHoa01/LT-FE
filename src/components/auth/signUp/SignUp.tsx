import "./SignUp.css"
export default function SignUp(){
    return (
        <>
            <div className="signUp">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <div className="name">
                        <span>Họ và tên: </span>
                        <input type="text" placeholder="Nhập họ và tên của bạn"/>
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
                        <input type="password" placeholder="Nhập mật khẩu của bạn"/>
                    </div>
                    <div className="passAgain">
                        <span>Xác nhận lại mật khẩu: </span>
                        <input type="password" placeholder="Nhập lại mật khẩu của bạn"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="signUp">Đăng ký</button>
                    <button id="had">Tôi đã có tài khoản</button>
                </div>
            </div>
        </>
    )
}