const express = require('express');
const app = express();

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {};

const getRecieverSocketid = (recieverId) => {
    return userSocketMap[recieverId];
};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.userid;

    if (userId !== "undefined" && userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // Handle incoming messages
    socket.on("sendMessage", ({ message, senderId }) => {
        const receiverSocketId = getRecieverSocketid(senderId); // You can modify this to send to specific users
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", { message, senderId });
        } else {
            // Broadcast to everyone
            io.emit("receiveMessage", { message, senderId });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

module.exports = { app, io, server, getRecieverSocketid };
