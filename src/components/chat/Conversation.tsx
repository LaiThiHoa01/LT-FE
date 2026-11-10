import './chat.css'
import avatarImg from '../../assets/woman_7185906.png'
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from '../../store/store';
import {addMessage, toggleInfo} from '../../store/slices/chatSlice';
import type { Message } from '../../types/chat';
import { sendChatMessage, sendGetPeopleMessages } from '../../services/chatService.ts';

export default function Conversation() {
    const dispatch = useAppDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const users = useAppSelector((state) => state.chat.users);
    const messagesByUser = useAppSelector((state) => state.chat.messagesByUser);
    const isInfoOpen = useAppSelector((state)=> state.chat.isInfoOpen);
    const activeUser = users.find((u) => u.id === activeConversationId) || users[0];
    const currentUserName = activeUser?.name || "User";
    const currentUserImg = activeUser?.img ||  avatarImg;
    const messages = (activeUser ? messagesByUser[activeUser.id] : []) || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (activeUser?.name) {
            sendGetPeopleMessages(activeUser.name, 1, activeUser.type);
        }
    }, [activeUser?.id]);

    const sendMessage = () => {
        const text = inputText.trim();
        if(text && activeUser){
            sendChatMessage(activeUser.name, text, activeUser.type === 1 ? "room" : "people");
            const myUsername = localStorage.getItem("username") || "me";
            const newMessage: Message = {
                id: crypto.randomUUID(),
                senderId: myUsername,
                text: text,
                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                isMe: true
            };
            dispatch(addMessage({
                conversationId: activeUser.id,
                message: newMessage
            }));
            setInputText("");
        }
    }

    const sendEmoji = (emoji: any) => {
        setInputText(prev => prev + emoji.emoji);
    };

    if (!activeUser) {
        return (
            <div className="conversation" >
                <p>Chọn một người để bắt đầu trò chuyện</p>
            </div>
        );
    }
    return (
        <>
            <div className="conversation">
                <div className="heading">
                    <div className="heading-left">
                        <div className="heading-avatar">
                            <img src={currentUserImg} alt="" />
                        </div>
                        <div className="heading-text">
                            {currentUserName}
                        </div>
                    </div>
                    <div className="heading-right">
                        <button className={`info-toggle-btn ${isInfoOpen ? "active" : ""}`} onClick={()=> dispatch(toggleInfo())}
                            title="Thông tin hội thoại">
                            <i className="fa-solid fa-circle-info"></i>
                        </button>
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