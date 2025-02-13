import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleSignOut = () => {
        // Remove the token from local storage
        localStorage.removeItem('authToken');
        
        // Redirect to the login page
        navigate("/Login");
        onClose(); // Close the sidebar
    };

    const handleSignIn = () => {
        navigate("/Login"); // Redirect to the login page
        onClose(); // Close the sidebar
    };

    return (
        <div
            className={`fixed top-16 overflow-scroll right-0 h-[calc(100vh-4rem)] bg-white shadow-xl transition-transform duration-300 ease-in-out z-50 w-64 ${onClose ? 'translate-x-0' : 'translate-x-full'}`}
        >
            {/* Close button */}
            <span
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-700 text-3xl cursor-pointer hover:text-gray-900 transition-colors duration-300"
            >
                {/* &times; Close icon */}
            </span>

            <div className="mt-12 flex flex-col space-y-6 pl-8">
                <Link
                    to="/Profile"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Profile
                </Link>
                <Link
                    to="/Error"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Library
                </Link>
                <Link
                    to="/Error"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Likes
                </Link>
                <Link
                    to="/Error"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Comments
                </Link>
                <Link
                    to="/Error"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Become a Prime
                </Link>
                <Link
                    to="/Error"
                    className="text-lg text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={onClose} // Close sidebar on click
                >
                    Settings
                </Link>
                <button
                    onClick={isAuthenticated ? handleSignOut : handleSignIn}
                    className="text-lg text-gray-700 relative right-[4.5rem] hover:text-gray-900 transition-colors duration-300"
                >
                    {isAuthenticated ? 'Sign out'  : 'Sign in'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
