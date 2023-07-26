import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Story = ({ number, title, link, text, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [storyHeight, setStoryHeight] = useState(null);

  useEffect(() => {
    if (isDeleting) {
      setStoryHeight(0);
    } else {
      setStoryHeight('auto');
    }
  }, [isDeleting]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`https://fastapi-ht4s.onrender.com/stories/${id}`, {
        method: 'DELETE',
        headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        }
      });
      if (response.ok) {
        console.log('Story successfully deleted');
      } else {
        console.error('Failed to delete story');
      }
    } catch (error) {
      console.error('Error while deleting story:', error);
    }
  };

  const handleAnimationEnd = () => {
    if (isDeleting) {
      setStoryHeight(0);
    }
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        height: storyHeight,
        transition: 'height 0.3s ease-out',
      }}
    >
      <div
        className={`flex flex-col md:flex-row items-center p-2 rounded-lg my-6 ${isDeleting ? 'slide-out' : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="md:w-24 md:h-24 w-16 h-16 overflow-hidden">
          <img
            src={number % 2 === 0 ? '/group.jpg' : '/poster.jpg'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row flex-grow md:ml-4 mt-4 md:mt-0">
          <div className="text-lg md:text-xl font-semibold text-white">{title}</div>
          <div className="text-sm mt-2 md:mt-0 md:ml-4 text-gray-400">{text}</div>
        </div>

        <button
          onClick={handleDelete}
          className="md:ml-4 mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600"
        >
          <img src="/trash.png" alt="Delete"></img>
        </button>

        <Link href={link}>
          <button className="md:ml-4 mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600">
            Read More
          </button>
        </Link>
      </div>

      <style jsx>{`
        .slide-out {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Story;
