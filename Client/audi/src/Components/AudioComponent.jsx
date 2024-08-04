import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Comments from './Comments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const AudioComponent = (props) => {
    const [audio, setAudio] = useState([]);
    const [file, setFile] = useState(null);
    const { songId } = props;
    const nav=useNavigate()

    const user = localStorage.getItem('id');

    const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
    const parsedAuth = JSON.parse(auth);
    const token = parsedAuth ? parsedAuth.token : null;

    const fetchAllAudio = useCallback(async () => {
        try {
            if (!token) {
                console.error('Token is not available');
                return;
            }

            const result = await axios.get(`http://localhost:8080/audio/${songId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
         
            setAudio(result.data.allAudios);
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
    }, [token, songId]);

    useEffect(() => {
        fetchAllAudio();
    }, [fetchAllAudio]);

    const deleteAudio = async (audioId) => {
        try {
            if (!token) {
                console.error('Token is not available');
                return;
            }
            const result = await axios.delete(`http://localhost:8080/audio/${user}/${songId}/delete/${audioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (result.status === 200) {
                setAudio(audio.filter((audio) => audio._id !== audioId));
            }
        } catch (error) {
            toast(error.response.data.message);
        }
    };

    const postAudio = async () => {
        try {
            if (!token) {
                console.error('Token is not available');
                return;
            }

            const formData = new FormData();
            formData.append('audio', file);

            const result = await axios.post(`http://localhost:8080/audio/${user}/${songId}/new/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });


            fetchAllAudio();
        } catch (error) {
            console.error('Error posting audio:', error);
        }
    };

    const Chat=(id)=>{
        nav(`/chats/${id}`)
    }

    return (
        <>
            <div className="container mx-auto p-4">
                {audio.length > 0 ? (
                    audio.map((audioItem, id) => (
                        <ul
                            key={id}
                            className="mb-4 p-4 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105"
                        >
                            <li className="text-xl font-semibold mb-2">Recorded by {audioItem.username.username.toUpperCase()}</li>
                            <audio className="w-full mt-2" src={audioItem.audioUrl} controls></audio>
                           
                            <button className='bg-fuchsia-300 w-80 h-10 rounded-2xl mt-4' onClick={()=>Chat(audioItem.username._id)}>Chat with {audioItem.username.username} </button>
                            <div className='flex justify-between items-center mt-4'>
                                <a
                                    href={audioItem.audioUrl}
                                    download
                                    className="text-blue-500 hover:underline"
                                >
                                    Download
                                </a>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 mr-4"
                                    onClick={() => deleteAudio(audioItem._id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <Comments userId={user} songId={songId} audioId={audioItem._id} />
                        </ul>
                    ))
                ) : (
                    <div className='text-white font-cabin text-center'>No audios present. Create Your First audio</div>
                )}
                <input type="file" className='block m-auto mt-4 text-center' onChange={(e) => setFile(e.target.files[0])} />
                <button className='bg-amber-300 block m-auto mt-4 p-4 w-60 h-19' onClick={postAudio}>Post Your First Audio</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default AudioComponent;
