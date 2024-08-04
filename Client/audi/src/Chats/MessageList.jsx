import React from 'react';
import Sidebar from './Sidebar';

const MessageList = ({ messages = [], userId }) => {
    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/4 bg-custom-dark-blue text-white p-4 rounded-l-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Conversation</h2>
                <Sidebar/>
            </div>

            {/* Messages */}
            <div className="message-list p-4 bg-gradient-to-b from-custom-dark-blue via-blue-900 to-blue-600 rounded-lg shadow-lg overflow-y-auto h-full w-3/4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`message mb-3 p-3 rounded-lg max-w-xs ${
                                message.senderId === userId
                                    ? 'bg-blue-500 text-white self-end animate-slide-in-right'
                                    : 'bg-gray-200 text-gray-900 self-start animate-slide-in-left'
                            }`}
                        >
                            <p>{message.message}</p>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center text-gray-400">No messages yet. Start a conversation!</h1>
                )}
            </div>
        </div>
    );
};

export default MessageList;
