const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema=new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message=mongoose.model('Message',MessageSchema);
module.exports=Message