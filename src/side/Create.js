import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Add useNavigate for redirection
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';

const Create = () => {
    const [create, setCreate] = useState({
        title: '',
        discription: '',
        photo: null,
        video: null
    });

    const navigate = useNavigate();  // Initialize useNavigate

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');  // Redirect to login page if not authenticated
        }
    }, [navigate]);

    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        setCreate((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            setCreate((prevData) => ({
                ...prevData,
                [name]: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        // Prevent submission if the user is not logged in
        if (!token) {
            navigate('/login');  // Redirect to login page if not authenticated
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', create.title);
            formData.append('discription', create.discription);
            if (create.photo) formData.append('photo', create.photo);
            if (create.video) formData.append('video', create.video);

            const response = await axios.post('http://localhost:8000/Create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            const { success, message } = response.data;

            if (success) {
                console.log('Post created successfully:', message);
                // Redirect to home page or show success message
                navigate('/');
            } else {
                console.log('Failed to create post:', message);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setCreate({
            title: '',
            discription: '',
            photo: null,
            video: null
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    const togglebar = () => {
        setIsOpen(!isOpen);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle Sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-md border border-gray-200 relative">
            <Link 
                to="/" 
                className="hover:text-gray-900 transition-colors duration-300 relative left-[95%] font-bold"
            >
                Home
            </Link>
            <button 
                onClick={toggleSidebar} 
                className={`focus:outline-none relative left-[95%] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-5' : 'translate-x-5'} `}
            >
                <FontAwesomeIcon 
                    icon={isSidebarOpen ? faTimes : faBars} 
                    className="text-gray-700 text-2xl hover:text-gray-900 transition-colors duration-300" 
                />
            </button>
            {/* Render Sidebar */}
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}

            <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type='text'
                        name='title'
                        value={create.title}
                        onChange={handleCreateChange}
                        placeholder='Title'
                        className="p-3 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <textarea
                        name='discription'
                        value={create.discription}
                        onChange={handleCreateChange}
                        placeholder='Tell your story...'
                        className="p-3 border border-gray-300 rounded-md w-full h-32 resize-none"
                    />
                </div>
                <div className="flex justify-between items-center relative">
                    <button type="button" onClick={togglebar} className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">
                        {isOpen ? 'Close Bar' : 'Open Bar'}
                    </button>
                    <div className={`absolute left-24 mt-2 ml-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'invisible'} w-64 p-4  flex  border-gray-200 z-50`}>
                        
                        <label className=" mb-4 cursor-pointer flex  items-center">
                            <FontAwesomeIcon icon={faImage} className="text-gray-600 text-xl mr-2" />
                            Add an image
                            <input
                                type='file'
                                name='photo'
                                accept='image/*'
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        
                        <label className="block cursor-pointer flex items-center">
                            <FontAwesomeIcon icon={faVideo} className="text-gray-600 text-xl mr-2" />
                            Add a video
                            <input
                                type='file'
                                name='video'
                                accept='video/*'
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className="mt-4">
                            {create.photo && (
                                <div className="mb-4">
                                    <img src={URL.createObjectURL(create.photo)} alt="Uploaded" className="w-32 h-auto border border-gray-300 rounded-md" />
                                </div>
                            )}
                            {create.video && (
                                <div>
                                    <video controls className="w-32 h-auto border border-gray-300 rounded-md">
                                        <source src={URL.createObjectURL(create.video)} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
