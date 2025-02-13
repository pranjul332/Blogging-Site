import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBelow = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="bg-white p-8 border-t border-gray-200">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Connect with Us</h2>
                <div className="flex space-x-4">
                    <Link to="https://www.facebook.com" target='_blank'>
                        <button className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">Facebook</button>
                    </Link>
                    <Link to="https://www.instagram.com" target='_blank'>
                        <button className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">Instagram</button>
                    </Link>
                    <Link to="https://www.pinterest.com" target='_blank'>
                        <button className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">Pinterest</button>
                    </Link>
                    <Link to="https://www.twitter.com" target='_blank'>
                        <button className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">X</button>
                    </Link>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-700 mb-4">I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                <Link to="/About" className="text-blue-500 hover:underline">Read More</Link>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Join My Mailing List</h2>
                <input 
                    type="email"
                    placeholder="Enter your email here"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-2 w-full max-w-xs"
                />
                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Subscribe Now</button>
            </div>
            {isVisible && (
                <button 
                    onClick={scrollToTop} 
                    className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default NavBelow;
