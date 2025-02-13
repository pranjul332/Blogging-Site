import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faComment as regularComment } from '@fortawesome/free-regular-svg-icons';
import Navbar from '../Navbar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [openComments, setOpenComments] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `http://localhost:8000/post/${postId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, likes: response.data.likes, liked: response.data.liked }
                        : post
                )
            );
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `http://localhost:8000/post/${postId}/comment`,
                { text: commentText[postId] || '' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCommentText(prevCommentText => ({
                ...prevCommentText,
                [postId]: ''
            }));

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, response.data.comments.slice(-1)[0]] }
                        : post
                )
            );
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const toggleComment = (postId) => {
        setOpenComments(prevOpenComments => ({
            ...prevOpenComments,
            [postId]: !prevOpenComments[postId]
        }));
    };

    const handleSearchResults = (results) => {
        setPosts(results);
    };

    return (
        <div>
            <Navbar onSearchResults={handleSearchResults} />
            <div className='bg-slate-100 w-full md:w-3/4 flex flex-col m-auto p-4 mt-20 '>
                <h1 className='text-3xl font-bold mb-8 text-center'>Blog Posts</h1>
                <div className='flex flex-col-reverse '>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className='border border-gray-300 shadow-lg rounded-lg p-6 mb-8 bg-white'>
                            {/* User Info */}
                            <div className='flex items-center mb-4'>
                                <img 
                                    src={`http://localhost:8000/${post.user.profilePicture}`} 
                                    alt={post.user.username}
                                    className='w-12 h-12 rounded-full mr-4'
                                />
                                <span className='font-semibold text-lg'>{post.user.username}</span>
                            </div>

                            <h2 className='font-serif text-3xl mb-4'>{post.title}</h2>
                            
                            {/* Image or Video */}
                            <div className='flex justify-center mb-4'>
                                {post.photo && (
                                    <img 
                                        src={`http://localhost:8000/${post.photo}`} 
                                        alt="User uploaded"
                                        className='w-[900px] h-[600px] max-w-full object-cover rounded-lg'
                                    />
                                )}
                                {post.video && (
                                    <video controls className='w-[900px] h-[600px] max-w-full rounded-lg'>
                                        <source src={`http://localhost:8000/${post.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>

                            {/* Description */}
                            <p className='text-lg text-gray-700 mb-6 mt-14'>{post.discription}</p>

                            {/* Like and Comment Icons */}
                            <div className='flex items-center gap-4 mb-4'>
                                <button
                                    onClick={() => handleLike(post._id)}
                                    className={`text-2xl ${post.liked ? 'text-red-500' : 'text-gray-400'} transition duration-300 ease-in-out hover:text-red-500`}
                                >
                                    <FontAwesomeIcon icon={post.liked ? faHeart : regularHeart} />
                                </button>
                                <span className='text-lg text-gray-700'>{post.likes}</span>

                                <button
                                    onClick={() => toggleComment(post._id)}
                                    className='ml-8 text-2xl text-gray-400 transition duration-300 ease-in-out hover:text-blue-500'
                                >
                                    <FontAwesomeIcon icon={openComments[post._id] ? faComment : regularComment} />
                                </button>
                            </div>

                            {/* Comment Section */}
<div className={`transition-all duration-500 ease-in-out ${openComments[post._id] ? 'max-h-[300px]' : 'max-h-0 overflow-hidden'}`}>
    <input
        placeholder='Add a comment...'
        value={commentText[post._id] || ''}
        onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
        className='w-full border border-gray-300 rounded-lg p-2 mt-4 mb-2 focus:outline-none focus:border-blue-500 transition-all'
    />
    <button
        onClick={() => handleCommentSubmit(post._id)}
        className='block ml-auto w-32 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out'
    >
        Submit
    </button>

    {/* Displaying Comments */}
    {Array.isArray(post.comments) && post.comments.length > 0 ? (
    <div className='mt-4 space-y-3'>
        {post.comments.map((comment, idx) => (
            <div key={idx} className='flex items-center bg-gray-100 p-3 rounded-lg border border-gray-300'>
                {/* Display user's profile picture */}
                <img 
                    src={`http://localhost:8000/${comment.user.profilePicture}`} 
                    alt={comment.user.username}
                    className='w-8 h-8 rounded-full mr-3'
                />
                <div>
                    {/* Display user's username */}
                    <p className='font-semibold'>{comment.user.username}</p>
                    <p>{comment.text}</p>
                </div>
            </div>
        ))}
    </div>
) : (
    <p className='mt-4 text-gray-500'>No comments yet.</p>
)}

</div>

                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No posts available</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default Home;
