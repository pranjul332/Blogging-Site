import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import axios from 'axios'; // Import axios for making API requests

const Navbar = ({ onSearchResults }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

    // Toggle Sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.get(`http://localhost:8000/posts?search=${searchQuery}`);
            onSearchResults(response.data); // Pass search results to parent component (Home)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="bg-white shadow-md py-4 px-8 fixed w-full top-0 z-10">
            <div className="flex justify-between items-center">
                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="flex space-x-4">
                    <input 
                        type="text"
                        placeholder="Search by title..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Search
                    </button>
                </form>
                {/* Navigation Links */}
                <ul className="flex space-x-8 text-gray-700 font-semibold">
                    <li>
                        <Link to="/" className="hover:text-gray-900 transition-colors duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/About" className="hover:text-gray-900 transition-colors duration-300">About</Link>
                    </li>
                    
                    <li>
                        <Link to="/Create" className="hover:text-gray-900 transition-colors duration-300">Create</Link>
                    </li>
                    {/* Hamburger Icon for Sidebar */}
                    <li>
                        <button 
                            onClick={toggleSidebar} 
                            className="focus:outline-none"
                        >
                            <FontAwesomeIcon 
                                icon={isSidebarOpen ? faTimes : faBars} 
                                className="text-gray-700 text-2xl hover:text-gray-900 transition-colors duration-300" 
                            />
                        </button>
                    </li>
                </ul>
            </div>
            {/* Render Sidebar */}
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
        </div>
    );
};

export default Navbar;
