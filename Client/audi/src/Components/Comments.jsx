import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fadein } from '../variants.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = (props) => {
    const { userId, songId, audioId } = props;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');


    const fetchComments = useCallback(async () => {
        try {
            const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth ? parsedAuth.token : null;

            if (!token) {
                throw new Error('No token found');
            }

            const result = await axios.get(`http://localhost:8080/comment/${songId}/${audioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setComments(result.data.result);
        } catch (error) {
            console.log(error);
        }
    }, [audioId, songId])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    const handlePostComment = async () => {
        try {
            const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth ? parsedAuth.token : null;

            if (!token) {
                throw new Error('No token found');
            }

            let result = await axios.post(`http://localhost:8080/comment/${userId}/${songId}/${audioId}/new`, { comment: newComment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNewComment('');
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth ? parsedAuth.token : null;

            if (!token) {
                throw new Error('No token found');
            }

            await axios.patch(`http://localhost:8080/comment/${userId}/${songId}/${audioId}/edit/${commentId}`, { newComment: editedComment }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditCommentId(null);
            setEditedComment('');
            fetchComments();
        } catch (error) {
            toast(error.response.data.message)
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const auth = localStorage.getItem('auth') || localStorage.getItem('Auth');
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth ? parsedAuth.token : null;

            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`http://localhost:8080/comment/${userId}/${songId}/${audioId}/delete/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchComments();
        } catch (error) {
            console.log(error);
            toast(error.response.data.message)
        }
    };

    return (
        <>
        <motion.div
            variants={fadein("right", 0)}
            initial='hidden'
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className='mt-10'
        >
            <h1 className='text-3xl text-center'>Comments Section</h1>
            <div className='flex flex-col gap-4 justify-center items-center mt-10'>
                {comments.map(comment => (
                    <div
                        key={comment._id}
                        className="max-w-xl mx-auto mb-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-lg dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="flex items-center mb-4">
                            <img className="w-12 h-12 rounded-full mr-4 border-2 border-blue-300" src={comment.profilePicture} alt={`${comment.username} profile`} />
                            <div className="text-sm">
                                <p className="text-blue-900 dark:text-black font-semibold leading-none">{comment.user.username.toUpperCase()}</p>

                                <p className='text-black'>{comment.comment}</p>
                                
                            </div>
                        </div>
                        {editCommentId === comment._id ? (
                            <div>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                />
                                <button
                                    onClick={() => handleEditComment(comment._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditCommentId(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-blue-800 dark:text-gray-300 mb-4">{comment.comment}</p>
                                <div className="text-right">
                                    <button
                                        onClick={() => setEditCommentId(comment._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className='mt-10'>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a new comment..."
                        className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />
                    <button
                        onClick={handlePostComment}
                        className="bg-amber-300 text-black px-4 py-2 rounded-md shadow-md hover:bg-amber-400"
                    >
                        Post Comment
                    </button>
                </div>
            </div>
        </motion.div>
        <ToastContainer/>
        </>
    );
};

export default Comments;
