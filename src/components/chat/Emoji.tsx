import {useState} from "react";
import EmojiPicker from "emoji-picker-react";

export default function AddEmoji() {
    const [selectedEmoji, setSelectedEmoji] = useState<string[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const handleEmojiClick = (emoji: any)=>{
        setSelectedEmoji(prevState => [...prevState, emoji]);
    }
    return (
        <div className="emoji-container">
            <button onClick={() => setShowPicker(!showPicker)}>
                {showPicker ? "Hide Picker" : "Show Picker"}
            </button>
            {showPicker && (
                <div className="picker-wrapper">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
            {selectedEmoji.length >0 &&(
                <div className="selected-emojis" style={{ marginTop: "20px" }}>
                    <strong>Selected Emojis: </strong>
                    <span style={{ fontSize: "20px" }}>{selectedEmoji.join("")}</span>
                </div>
            )}
        </div>
    )

}