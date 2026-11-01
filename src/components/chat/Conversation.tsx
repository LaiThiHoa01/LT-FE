import './chat.css'
import avatarImg from '../../assets/woman_7185906.png'
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

interface Message {
    id: number | string;
    senderId: string | number;
    text: string;
    time: string;
    isMe: boolean;
}

interface ConversationProps {
    selectedUser?: {
        name: string;
        img: string;
    };
}

export default function Conversation({ selectedUser }: ConversationProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messagesByUser, setMessagesByUser] = useState<Record<string, Message[]>>({
        "Lai Thi Hoa": [
            { id: 1, senderId: 2, text: "Hello, how r u?", time: "20:00", isMe: false }
        ],
        "Phung Thi Minh Thu": [
            { id: 2, senderId: 2, text: "Hello", time: "20:00", isMe: false }
        ],
        "Than Van Danh": [
            { id: 3, senderId: 2, text: "Hello", time: "20:00", isMe: false }
        ]
    });

    const currentUserName = selectedUser?.name || "Lai Thi Hoa";
    const messages = messagesByUser[currentUserName] || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if(inputText.trim()){
            const newMessage: Message = {
                id:crypto.randomUUID(),
                senderId:1,
                text:inputText,
                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                isMe: true
            };
            setMessagesByUser(prev => ({...prev, [currentUserName]: [...(prev[currentUserName] || []), newMessage]}));
            setInputText("");
        }
    }

    const sendEmoji = (emoji: any) => {
        setInputText(prev => prev + emoji.emoji);
    };

    return (
        <>
            <div className="conversation">
                <div className="heading">
                    <div className="heading-avatar">
                        <img src={selectedUser?.img || avatarImg} alt="" />
                    </div>
                    <div className="heading-text">
                        {selectedUser?.name || "Lại Thị Hoa"}
                    </div>
                </div>
                <div className="message-list" style={{ overflowY: 'auto', flex: 1 }}>
                    {messages.map((msg) => (
                        <div key={msg.id}
                             className ={msg.isMe ? "message my-message" : "message-receive other-message"}>
                            <span>{msg.text}</span>
                            <div className="time-send"> {msg.time}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
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