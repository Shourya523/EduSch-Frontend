import React from 'react';
import './AiChat.css'; // Dedicated CSS for the chat component
import { X, Bot, Send } from 'lucide-react';

const AIChat = ({ onClose }) => {
    return (
        <div className="s-chat-overlay">
            <div className="s-chat-window">
                <div className="s-chat-header">
                    <p>This is just a demo visualization</p>
                    <button onClick={onClose} className="s-chat-close-btn">
                        <X size={20} />
                    </button>
                </div>
                <div className="s-chat-messages">
                    <div className="s-chat-message ai">
                        <Bot size={24} className="s-chat-avatar" />
                        <p>Hello! How can I help you with your schedule or campus questions today?</p>
                    </div>
                </div>
                <div className="s-chat-input-area">
                    <input type="text" placeholder="Ask about your classes..." />
                    <button><Send size={20} /></button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
