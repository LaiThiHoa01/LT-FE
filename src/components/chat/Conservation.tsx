import './chat.css'
import avatarImg from '../../assets/woman_7185906.png'
import {useState} from "react";
import EmojiPicker from "emoji-picker-react";
interface Message {
    id: number | string;
    senderId: string | number;
    text: string;
    time: string;
    isMe: boolean;
}
export default function Conservation(){
    const [showPicker, setShowPicker] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const sendMessage = () => {
        if(inputText.trim()){
            const newMessage: Message = {
                id:crypto.randomUUID(),
                senderId:1,
                text:inputText,
                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                isMe: true
            };
            setMessages([...messages, newMessage]);
            setInputText("");
        }
    }
    const sendEmoji = (emoji: any) => {
        setInputText(prev => prev + emoji.emoji);
    };
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
                    {messages.map((msg) =>(
                        <div key={msg.id}
                             className ={msg.isMe ? "message my-message" : "message other-message"}>
                            <span>{msg.text}</span>
                            <div className="time-send"> {msg.time}</div>
                        </div>
                    ))}
                </div>
                {showPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker width={300} height={350} onEmojiClick={sendEmoji} />
                    </div>
                )}
                <div className="reply">
                    <div className="emojis" onClick={() => setShowPicker(!showPicker)}>
                        <i className="fa-regular fa-face-grin"></i>
                    </div>
                    <div className="reply-main">
                        <label>
                            <input  className="form-control" type="text" placeholder="Type your message here" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }} ></input>
                        </label>
                    </div>
                    <div className="reply-send" onClick={sendMessage}>
                        <i className="fa-regular fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </>
    )
}