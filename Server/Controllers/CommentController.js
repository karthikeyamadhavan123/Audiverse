const Audio = require('../models/AudioSchema');
const User = require('../models/UserSchema');
const Comment = require('../models/CommentSchema');
const Song = require('../models/SongSchema');
const { Schema } = require('mongoose');
const mongoose=require('mongoose')

const newComment = async (req, res) => {
    try {
        const { userId, audioId, songId } = req.params;
        const { comment } = req.body;
       
        if (!userId || !audioId || !songId) {
            return res.status(400).json({ success: false, message: 'No userId or audioId or songId' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'No user found' });
        }
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(400).json({ success: false, message: 'No song found' });
        }


        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(400).json({ success: false, message: 'No audio found' });
        }

        const newComment = new Comment({
            comment: comment,
            user: user._id,
            audioUrl: audio._id,
            song: song._id
        })
        await newComment.save();
        return res.status(200).json({
            success: true,
            message: 'Comment Uploaded',
            comments: newComment
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

const editComment = async (req, res) => {
    try {
        const { userId, audioId, songId, commentId } = req.params;
        const { newComment } = req.body;
        if (!userId || !audioId || !songId || !commentId) {
            return res.status(400).json({ success: false, message: 'No userId or audioId or songId or commentId' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'No user found' });
        }
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(400).json({ success: false, message: 'No song found' });
        }


        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(400).json({ success: false, message: 'No audio found' });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ success: false, message: 'No comment found' });
        }
        const userIdStr = user._id.toString();
        const CommentUserIdStr = comment.user._id.toString();
        if (userIdStr !== CommentUserIdStr) {
            return res.status(403).json({ success: false, message: 'Not Authorized to edit comment' });
        }

        let result = await Comment.findByIdAndUpdate(commentId, { comment: newComment })
        await result.save()
        return res.status(200).json({
            success: true,
            message: 'Comment Edited',
            comments: result
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


const deleteComment = async (req, res) => {
    try {
        const { userId, audioId, songId, commentId } = req.params;
        if (!userId || !audioId || !songId || !commentId) {
            return res.status(400).json({ success: false, message: 'No userId or audioId or songId or commentId' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'No user found' });
        }
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(400).json({ success: false, message: 'No song found' });
        }


        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(400).json({ success: false, message: 'No audio found' });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(400).json({ success: false, message: 'No comment found' });
        }
        const userIdStr = user._id.toString();
        const CommentUserIdStr = comment.user._id.toString();
        if (userIdStr !== CommentUserIdStr) {
            return res.status(403).json({ success: false, message: 'Not Authorized to delete comment' });
        }

        let result = await Comment.findByIdAndDelete(commentId)

        return res.status(200).json({
            success: true,
            message: 'Comment Deleted',
            comments: result
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getComments = async (req, res) => {
    try {
        const { audioId, songId } = req.params;

        // Check if audioId and songId are valid ObjectIds
        if (!audioId || !mongoose.Types.ObjectId.isValid(audioId)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing audioId' });
        }

        if (!songId || !mongoose.Types.ObjectId.isValid(songId)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing songId' });
        }

        // Find the song by ID
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        // Find the audio by ID
        const audio = await Audio.findById(audioId);
        if (!audio) {
            return res.status(404).json({ success: false, message: 'Audio not found' });
        }

        // Find the comments by songId and audioId
        const comments = await Comment.find({ song: songId, audioUrl: audioId }).populate('user');

        res.status(200).json({ success: true, message: 'Fetched successfully', result: comments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    newComment,
    editComment,
    deleteComment,
    getComments

}