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
      const response = await fetch(`http://localhost:8000/stories/${id}`, {
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
      style={{
        overflow: 'hidden',
        height: storyHeight,
        transition: 'height 0.3s ease-out',
      }}
    >
      <div
        className={`flex items-center p-2 rounded-lg my-6 ${isDeleting ? 'slide-out' : ''}`}
        onAnimationEnd={handleAnimationEnd}
        style={{
          opacity: isDeleting ? '0' : '1',
          margin: '16px 0',
          padding: '16px',
        }}
      >
        <div className="rounded-[10px] w-24 h-24 overflow-hidden">
          <img
            src={number % 2 === 0 ? '/group.jpg' : '/poster.jpg'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow ml-4">
          <div className="text-[20px] font-semibold text-white">{title}</div>
          <div className="text-sm mt-[10px] text-gray-400">{text}</div>
        </div>

        <button
          onClick={handleDelete}
          className="mr-2 bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-red-600 flex items-center"
        >
          <img src="/trash.png"></img>
        </button>

        <Link href={link}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600">
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
