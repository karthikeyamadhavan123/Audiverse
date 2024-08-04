const mongoose = require('mongoose');
const { Schema } = mongoose;
const Song=require('../models/SongSchema');
const Comment=require('../models/CommentSchema')
const AudioSchema = new mongoose.Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: "Song",
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      },

});
AudioSchema.post('findOneAndDelete', async function(audio, next) {
    try {
        if (audio && audio.song) { // this is the case where we have to delete from parent first and child next this doc is the audio object and the doc.song is audi.song
            await Song.updateOne(
                { _id: audio.song },
                { $pull: { audio_recordings: audio._id } }
            );
        }
        await Comment.deleteMany({ audioUrl: audio._id });
        next();

    } catch (err) {
        next(err);
    }
});
  

const Audio=mongoose.model('Audio',AudioSchema);
module.exports=Audio;
