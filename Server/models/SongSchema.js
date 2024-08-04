const mongoose = require('mongoose');
const { Schema } = mongoose;




const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    
  },
  owner: {
   type:String,
   required: true,
  },
  genre: {
    type: [String],
    required: true,
    
  },
  duration: {
    type: Number,
    required: true
  },
  lyrics: {
    type: String,
    trim: true
  },

  image: {
    type: String,
    required:true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },

  audio_recordings:[{
    type:Schema.Types.ObjectId,
    ref:"Audio"
  }]
  
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
