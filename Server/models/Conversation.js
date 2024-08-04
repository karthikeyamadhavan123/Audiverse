const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema=new Schema({
    participants:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]
},{timestamps:true})

const Conversation=mongoose.model('Conversation',ConversationSchema);
module.exports=Conversation