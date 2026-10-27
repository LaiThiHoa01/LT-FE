import './chat.css'
import avatarImg from './img/woman_7185906.png'
export default function Conservation(){
    return(<>
            <div className="conservation">
                <div className="heading">
                    <div className="heading-avatar">
                        <img src={avatarImg} alt="" />
                    </div>
                    <div className="heading-text">
                        Lại Thị Hoa
                    </div>
                </div>
                <div className="message-send">
                    <div className="message">
                        <span> Hello, how r u?</span>
                        <div className="time-send"> 20:00</div>
                    </div>
                    <div className="message">
                        <span> Hello</span>
                        <div className="time-send"> 20:00</div>
                    </div>
                </div>
                <div className="reply">
                    <div className="emojis">
                        <i className="fa-regular fa-face-grin"></i>
                    </div>
                    <div className="reply-main">
                        <label>
                            <input className="form-control" type="text" placeholder="Type your message here"/>
                        </label>
                    </div>
                    <div className="reply-send">
                        <i className="fa-regular fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </>
    )
}