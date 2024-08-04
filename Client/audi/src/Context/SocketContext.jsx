import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './Authcontext';

const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext);
}

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [auth] = useContext(AuthContext);
    const userId = localStorage.getItem('id');

    useEffect(() => {
        if (auth && userId) {
            const newSocket = io("http://localhost:8080", {
                query: {
                    userid: userId
                }
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Listen for incoming messages
            newSocket.on("receiveMessage", (message) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            return () => {
                newSocket.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [auth, userId]);

    const sendMessage = (messageContent) => {
        const message = { message: messageContent, senderId: userId, _id: Date.now() }; // Use Date.now() as temporary ID
        setMessages(prevMessages => [...prevMessages, message]);
        
        if (socket) {
            socket.emit("sendMessage", message);
        }
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
