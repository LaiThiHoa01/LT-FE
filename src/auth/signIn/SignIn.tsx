import "./SignIn.css"
export default function SignIn(){
    return (
        <>
            <div className="signIn">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <input type="text" placeholder="Số di động hoặc email"/>
                    <input type="text" placeholder="Mật khẩu"/>
                </div>
                <div className="btn">
                    <button id="signIn">Đăng nhập</button>
                    <button id="forget">Quên mật khẩu</button>
                </div>
                <div className="bottom">
                    <button id="signUp">Tạo tài khoản mới</button>
                </div>
            </div>
        </>
    )
}