import './chat.css'
import avatarImg from '../../assets/woman_7185906.png'
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addMessage } from '../../store/slices/chatSlice';
import type { Message } from '../../types/chat';

interface ConversationProps {
    selectedUser?: {
        name: string;
        img: string;
    };
    onToggleInfo?: () => void;
    isInfoOpen?: boolean;
}

export default function Conversation({ selectedUser, onToggleInfo,isInfoOpen }: ConversationProps) {
    const dispatch = useAppDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeConversationId = useAppSelector((state) => state.chat.activeConversationId);
    const users = useAppSelector((state) => state.chat.users);
    const messagesByUser = useAppSelector((state) => state.chat.messagesByUser);

    const activeUser = users.find((u) => u.id === activeConversationId) || users[0];
    const currentUserName = activeUser?.name || selectedUser?.name;
    const currentUserImg = activeUser?.img || selectedUser?.img || avatarImg;
    const messages = (activeUser ? messagesByUser[activeUser.id] : []) || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if(inputText.trim() && activeUser){
            const newMessage: Message = {
                id:crypto.randomUUID(),
                senderId:1,
                text:inputText,
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
                        <button className={`info-toggle-btn ${isInfoOpen ? "active" : ""}`} onClick={onToggleInfo}
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