import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='p-5 flex items-center justify-between shadow-lg'>
      <div className='flex items-center'>
        {/* If you have a logo or image, replace `src` with the actual path */}
        {/* <img src="path/to/logo.png" alt="Logo" className='mr-4' /> */}
        <Link to='/'><h1 className='text-4xl font-rye'>Audio Verse</h1></Link>
      </div>
      <div className='flex gap-10 mr-5 font-rye'>
        <Link
          to='/api/register'
          className='text-white bg-blue-800 p-2 rounded-lg shadow-lg hover:text-yellow-500 hover:bg-blue-900 transition-all duration-300 ease-in-out transform hover:scale-110'
        >
          Register Now
        </Link>
        <Link
          to='/api/login'
          className='text-white bg-blue-800 p-2 rounded-lg shadow-lg hover:text-yellow-500 hover:bg-blue-900 transition-all duration-300 ease-in-out transform hover:scale-110'
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
