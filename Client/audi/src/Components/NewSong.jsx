import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Song.css';
import {useNavigate} from 'react-router-dom' // Import the CSS file for styling

const CreateSongForm = () => {
  const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
  const parsedAuth = JSON.parse(auth);
  const token = parsedAuth ? parsedAuth.token : null;
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    lyrics: '',
    genre: '',
    duration: '',
    image: null,
    owner: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('lyrics', formData.lyrics);
    data.append('genre', formData.genre);
    data.append('duration', formData.duration);
    data.append('image', formData.image);
    data.append('owner', formData.owner);

    try {
     const result= await axios.post('http://localhost:8080/songs/new', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },

      }
    );
    if(result.status===201){
      navigate('/songs')
    }
   
    } catch (error) {
      // Handle errors
      console.error('Error uploading song:', error);
    }
  };

  return (
    <div className="form-page">
      <form className="song-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a New Song</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lyrics">Lyrics</label>
          <textarea
            id="lyrics"
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
            className="form-input"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="duration">Duration (in seconds)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSongForm;
