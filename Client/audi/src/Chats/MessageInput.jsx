import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <form className="flex border-t border-gray-300 p-4 bg-custom-dark-blue rounded-b-lg" onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-3 ml-2 bg-blue-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;
