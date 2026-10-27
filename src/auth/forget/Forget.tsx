import "./Forget.css"
export default function Forget(){
    return (
        <>
            <div className="forget">
                <div className="title">
                    <h1>APP CHAT</h1>
                </div>
                <div className="input">
                    <span>Email: </span>
                    <div className="email">
                        <input type="email" placeholder="Nhập email"/>
                    </div>
                </div>
                <div className="btn">
                    <button id="send">Gửi</button>
                </div>
            </div>
        </>
    )
}