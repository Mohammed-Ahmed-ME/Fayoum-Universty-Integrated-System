import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../Images/404.jpg';

const Error = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }; const handleClick2 = () => {
        navigate('/Login');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative w-full h-full">
                <img
                    src={img}
                    alt="Page not found"
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0">
                    <h1 className="text-4xl font-bold text-blue-700 pt-10 pl-5">You Are Not Authorized!!</h1>
                </div>
                <div className="absolute bottom-10 left-0 right-0 flex justify-center mb-8">
                    <button
                        className="text-xl py-2 px-4 bg-blue-700 text-white rounded"
                        onClick={handleClick}
                    >
                        Home Page
                    </button>
                    <button
                        className="text-xl py-2 px-4 bg-blue-700 text-white rounded ml-10"
                        onClick={handleClick2}
                    >
                        Login Page
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Error;
