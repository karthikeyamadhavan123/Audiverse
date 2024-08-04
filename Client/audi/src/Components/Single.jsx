import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Audio from './AudioComponent'
const Single = () => {
  const { id } = useParams();
  const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
  const parsedAuth = JSON.parse(auth);

  const token = parsedAuth ? parsedAuth.token : null;

  const [song, setSong] = useState({});

  const fetchAllSongs = useCallback(async () => {
    try {
      if (!token) {
        return 'token not there';
      }

      const result = await axios.get(`http://localhost:8080/songs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const songobject = result.data.singleSong;
      setSong(songobject);
    } catch (error) {
      console.log(error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  return (
    <div className="bg-gradient-to-br from-green-500 to-blue-500 min-h-screen flex flex-col items-center py-10">
    <h2 className="text-2xl text-white font-semibold">PLAYING FROM SONGS</h2>
    <p className="text-lg text-white mb-5">"search" from songs</p>
    <div className="bg-green-100 rounded-xl shadow-lg p-5 flex flex-col items-center">
      <img src={song.image} alt={song.title} className="w-96 h-96 rounded-mb  mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">{song.title}</h3>
      <h3 className="text-lg text-gray-700 mb-4">By {song.owner}</h3>
      <div className="w-96 bg-green-600 rounded-xl p-4 overflow-y-auto max-h-96 flex flex-wrap">
        <h3 className="text-white text-left">{song.lyrics}</h3>
      </div>
    </div>
    <Audio songId={id}/>
  </div>
  )
}

export default Single;
