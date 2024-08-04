import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import {useParams} from 'react-router-dom'
const Chat = () => {
  const {id}=useParams();
  const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
  const parsedAuth = JSON.parse(auth);
  // check null condition 
  const token = parsedAuth ? parsedAuth.token : null;
    const [messages, setMessages] = useState([]);
    // const[sender,setSender]=useState(null);
    // const[reciever,SetReciever]=useState(null);

    const userId = localStorage.getItem('id'); // Replace with actual user ID

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/chats/${id}`,{
                  headers:{
                    Authorization:`Bearer ${token} `
                  }
                });
             
                setMessages(response.data.messages);
                // setSender(response.data.sender);
                // SetReciever(response.data.reciever);
                
               
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [id,token]);

    const sendMessage = async (message) => {
        try {
            const response = await axios.post(`http://localhost:8080/chats/send/${id}`, { message }, {
                headers: {
                    Authorization: `Bearer ${token}` // Replace with actual token
                }
            });
            setMessages([...messages, response.data]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
      <div className="flex flex-col h-screen border rounded-lg overflow-hidden">
      <MessageInput sendMessage={sendMessage} />
      <MessageList messages={messages} userId={userId}/>
  </div>
    );
};

export default Chat;
