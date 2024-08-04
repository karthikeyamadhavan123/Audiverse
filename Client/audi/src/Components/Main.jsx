import React from 'react';
import Wanna from '../images/wanna.webp';
import Talk from '../images/talk.png';
import Star from '../images/Starboy.jpg';
import { motion } from 'framer-motion';
import { fadein } from '../variants.js';
import { Typewriter,Cursor } from 'react-simple-typewriter';

const Main = () => {
  const words = [
    { text: 'This is where we can discover skills', font: 'font-roboto' },
    { text: 'Explore Your Talent', font: 'font-sans' },
    { text: 'Unleash Your Creativity', font: 'font-mono' },
    { text: 'Share Your Passion', font: 'font-cursive' },
    { text: 'Join Our Community', font: 'font-display' },
  ];

  return (
    <motion.div 
      variants={fadein("up", 0.2)}
      initial='hidden'
      whileInView={"show"}
      viewport={{once: false, amount: 0.7}} 
      className='p-12'
    >
      <div className='flex flex-col items-center'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold font-cabin text-white'>Welcome To Audio Verse</h1>
          
          <Typewriter
            words={words.map(word => word.text)}
            loop={true}
            typeSpeed={120}
            deleteSpeed={80}
            
          >
            {text => {
              const currentWord = words.find(word => word.text === text);
              return (
                <p className={`text-lg text-white mt-4 max-w-2xl ${currentWord ? currentWord.font : ''}`}>
                  {text}
                  <Cursor />
                </p>
              );
            }}
          </Typewriter>
        </div>
        <div className='grid grid-cols-3 gap-8 items-center'>
          <div className='col-span-1 flex justify-center'>
            <img 
              src={Star} 
              alt="Star" 
              className='w-60 h-60 rounded-full transform transition-transform duration-500 hover:scale-110'
            />
          </div>
          <div className='col-span-1 flex justify-center'>
            <img 
              src={Wanna} 
              alt="Wanna" 
              className='w-60 h-60 rounded-full transform transition-transform duration-500 hover:scale-110'
            />
          </div>
          <div className='col-span-1 flex justify-center'>
            <img 
              src={Talk} 
              alt="Talk" 
              className='w-60 h-60 rounded-full transform transition-transform duration-500 hover:scale-110'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Main;
