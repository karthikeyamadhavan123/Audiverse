const Audio = require('../models/AudioSchema');
const User = require('../models/UserSchema');
const Song = require('../models/SongSchema');


const newAudio = async (req, res) => {
  try {
    const { userId, songId } = req.params;
    const audioUrl = req.file.path ;



    if (!userId || !songId) {
      return res.status(400).json({ success: false, message: 'No userId or songId' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'No user found' });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(400).json({ success: false, message: 'No song found' });
    }

    const newAudio = new Audio({
      username: user,
      song: song,
      audioUrl: audioUrl
    });

    song.audio_recordings.push(newAudio._id);
    await song.save();
    await newAudio.save();

    return res.status(200).json({
      success: true,
      message: 'Audio Uploaded',
      audio: newAudio
    });

  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getAudio = async (req, res) => {
  try {
    const { songId } = req.params;

    // Find all audios where the song field matches the given songId
    const allAudios = await Audio.find({ song: songId }).populate('username');

    if (!allAudios || allAudios.length === 0) {
      return res.status(400).send({ success: false, message: 'No Audios are present' });
    }

    return res.status(200).json({ success: true, message: 'Successfully fetched all Audios', allAudios });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


const deleteAudio = async (req, res) => {
  try {
    const { userId, songId, audioId } = req.params;
    if (!userId || !songId || !audioId) {
      return res.status(400).json({ success: false, message: 'No userId or songId or audioId' });
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
    const userIdStr = user._id.toString();
    const audioUserIdStr = audio.username._id.toString();

    if(userIdStr!==audioUserIdStr){
      return res.status(403).json({ success: false, message: 'Not Authorized to delete' });
    }
    await Audio.findByIdAndDelete(audioId);
    return res.status(200).json({ success: true, message: 'Successfully deleted  Audio' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
module.exports = {
  newAudio,
  getAudio,
  deleteAudio
};
