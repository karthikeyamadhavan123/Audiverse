import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Songs = () => {
  const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
  const parsedAuth = JSON.parse(auth);
  const username = parsedAuth ? parsedAuth.username : 'Guest'; // check null condition 
  const token = parsedAuth ? parsedAuth.token : null;
  

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllSongs = useCallback(async () => {
    try {
      if (!token) {
        setError('Token is invalid or missing');
        return;
      }

      const result = await axios.get('http://localhost:8080/songs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      localStorage.setItem('id',result.data.userId)
      setSongs(result.data.allSongs);
    } catch (error) {
      setError('Error fetching songs: ' + error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  const singlesong = (id) => {
    if (!id) {
      return 'no song';
    }
    navigate(`/songs/${id}`);
  };
const postsong=()=>{
 navigate('/songs/new')

}
  return (
    <div className="min-h-screen bg-gradient-to-r from-custom-dark-blue to-blue-500 flex p-4">
      <aside className="w-64 bg-gray-900 text-white p-4 rounded-lg shadow-lg mr-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Your Library</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="#" className="text-white hover:text-gray-300">Playlists</Link>
            </li>
            <li className="mb-4">
              <Link to="#" className="text-white hover:text-gray-300">Artists</Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">My Playlists</h2>
          <ul>
            <li className="mb-2">
              <Link to="#" className="text-white hover:text-gray-300">Liked Songs</Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-white hover:text-gray-300">My playlist #6</Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-white hover:text-gray-300">Telugu</Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-white hover:text-gray-300">Tamil</Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-white hover:text-gray-300">English</Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold">Songs</h1>
            <h2 className="text-2xl">Made For {username}</h2>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Explore Premium</button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg ml-4">Install App</button>
          </div>
        </header>
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {songs.map((song) => (
              <div key={song.id} className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
                <img src={song.image} alt={song.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white">{song.title}</h2>
                  <p className="text-gray-300">By {song.owner}</p>
                  <p className="text-gray-300">{song.genre}</p>
                  <p className="text-gray-300">{song.duration}</p>
                  <button
                    onClick={() => singlesong(song._id)}
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    View Song
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </main>
      <div>
        <button onClick={postsong}>Add a new song</button>
      </div>
    </div>
  );
};

export default Songs;
