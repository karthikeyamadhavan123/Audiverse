const { app, server } = require('./Socket/socket.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const registerRouter = require('./Routes/UserRoute.js')
const SongRouter=require('./Routes/SongRoute.js')
const AudioRouter=require('./Routes/AudioRoute.js')
const CommentRouter = require('./Routes/CommentRoute.js')
const ChatRouter = require('./Routes/MessageRoute.js')
const port=8080||process.env.PORT;
const express=require('express')

// middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use("/api", registerRouter);
app.use('/songs',SongRouter);
app.use('/audio',AudioRouter);
app.use('/comment',CommentRouter);
app.use('/chats',ChatRouter)

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Audioverse');
    console.log('database connected');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.listen(port, () => {
    console.log(`listenting on ${port}`);
})