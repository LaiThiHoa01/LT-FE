import './chat.css'
import avatarImg from '../chat/img/woman_7185906.png'
import {useState} from "react";
import EmojiPicker from "emoji-picker-react";
export default function Conservation(){
    const [showPicker, setShowPicker] = useState(false);
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
                {showPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker width={300} height={350} />
                    </div>
                )}
                <div className="reply">
                    <div className="emojis" onClick={() => setShowPicker(!showPicker)}>
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