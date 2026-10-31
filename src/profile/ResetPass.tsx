import "./Profile.css"
import "./ResetPass.css"
export default function ResetPass(){
    return (
        <>
            <div className="reset">
                <h1>Đổi mật khẩu</h1>
                <div className="pass">
                        <div className="oldPass">
                            <span>Mật khẩu hiện tại: </span>
                            <input type="password"  value="********" placeholder="Nhập mật khẩu của bạn"/>
                        </div>
                        <div className="newPass">
                            <span>Mật khẩu mới: </span>
                            <input type="password"  value="********" placeholder="Nhập mật khẩu của bạn"/>
                        </div>
                        <div className="newPassAgain">
                            <span>Nhập lại mật khẩu: </span>
                            <input type="password"  value="********" placeholder="Nhập mật khẩu của bạn"/>
                        </div>
                    </div>
                <div className="btn">
                    <button id="btnUpdate">Cập nhật</button>
                </div>
            </div>
        </>
    )
}