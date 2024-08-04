// Home.js
import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import Comments from './Comments';

const Home = () => {

  return (
    <div className='bg-custom-dark-blue h-full w-full text-white flex flex-col'>
   
      <Navbar />
      <Main />
    
      <Comments />
      <Footer />
    </div>
  );
};

export default Home;
