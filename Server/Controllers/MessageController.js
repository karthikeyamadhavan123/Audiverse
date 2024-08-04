const Conversation = require('../models/Conversation')
const Message = require('../models/MessageModel');
const User=require('../models/UserSchema');
const { getRecieverSocketid } = require('../Socket/socket');
const SendMessage = async (req, res) => {
    try {
        const { id: recieverId } = req.params; // this is reciever  
        const senderId = req.userId;// from jwt
        const { message } = req.body
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }
        const newMessage = new Message({
            senderId: senderId,
            recieverId: recieverId,
            message: message
        })


        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // Socket io will go here
        // await conversation.save();
        // await newMessage.save();
        // this will run parallel
        await Promise.all([conversation.save(), newMessage.save()])

        const recieverSocketid=getRecieverSocketid(recieverId)
        if(recieverSocketid){
            io.to(recieverSocketid).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

const getMessage = async (req, res) => {
    try {
        const { id: userTochatid } = req.params // reciever id
        const senderId = req.userId;// from jwt
        const conversation = await Conversation.findOne({ participants: { $all: [senderId, userTochatid] } }).populate('messages');
        if (!conversation) {
            return res.status(200).json([])
        }
        const sender=await User.findById(senderId);
        const reciever=await User.findById(userTochatid);
        const sendername=sender.username;
        const recievername=reciever.username
        
        const messages = conversation.messages
        return res.status(200).send({success:true,messages:messages,sender:sendername,reciever:recievername})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    SendMessage, getMessage
}