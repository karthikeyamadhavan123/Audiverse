const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    audioUrl: {
        type: Schema.Types.ObjectId,
        ref: 'Audio',
        required: true,
    },
    song:{
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Comment=mongoose.model('Comment',CommentSchema);
module.exports=Comment;