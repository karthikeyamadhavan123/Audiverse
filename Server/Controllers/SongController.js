const Song = require('../models/SongSchema');
const cloudinary = require('../util/cloudinary')

const newSong = async (req, res) => {
  try {
    const { title, owner, genre, duration, lyrics } = req.body;
   

    // Validate required fields
    if (!req.file || !title || !owner || !genre || !duration || !lyrics) {
      console.error("Validation Error: Missing required fields", {
        file: req.file,
        title,
        owner,
        genre,
        duration,
        lyrics
      });
      return res.status(400).send({ success: false, message: 'All fields are required' });
    }

    const imageUrl = req.file.path;
    
   

    const newSong = new Song({
      title,
      owner,
      genre,
      duration,
      lyrics,
      image: imageUrl
    });

    await newSong.save();

    res.status(201).json({ success: true, message: 'Successfully Created Song', newSong });
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const getSongs = async (req, res) => {
  try {
    const allSongs = await Song.find({});
    if (!allSongs) {
      return res.status(400).send({ success: false, message: 'No Song is present' });
    }
    return res.status(200).json({ success: true, message: 'Successfully fetched all Songs', allSongs,userId:req.userId});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// const editSongs
const getSingleSong=async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).send({ success: false, message: 'No id is sent' });
    }
    const singleSong=await Song.findById(id)
      if(!singleSong){
        return res.status(400).send({ success: false, message: 'No Song is Present with given id' });
      }
      return res.status(200).json({ success: true, message: 'Successfully fetched all Songs', singleSong, userId: req.userId });
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
module.exports = {
  newSong,
  getSongs,
  getSingleSong
}