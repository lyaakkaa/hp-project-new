
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './chat';

const fetchStory = async () => {
  if (typeof window === "undefined") {
    return {}
  }
  if (localStorage.getItem("story_id") != null) {
    console.log("story_id", localStorage.getItem("story_id"))
    console.log("token", localStorage.getItem("token"))
    try {
      const response = await axios.get(`https://fastapi-ht4s.onrender.com/stories/${localStorage.getItem("story_id")}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "accept": 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching story:", error);
      return {};
    }
  } else {
    const story = {
      story: {
        content: "Your story"
      }
    };
    return story;
  }
};

function removeNumbersAndParentheses(text) {
  const regex = /[0-9()]/g;
  return text.replace(regex, '');
}

const StoryGenPage = () => {
  const [storyInfo, setStoryInfo] = useState(null);
  const [isPhone, setIsPhone] = useState(false);


  useEffect(() => {
    localStorage.removeItem('story_id')
    localStorage.removeItem('next_question')
    const fetchAndUpdateStory = async () => {
      const story = await fetchStory();
      if (story && story.story) {
        setStoryInfo(story.story.content);
      }
    };

    const intervalId = setInterval(fetchAndUpdateStory, 5000);

    fetchAndUpdateStory();

    return () => clearInterval(intervalId);
  }, []);

  // check for smaller screens
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width to the desired breakpoint for phones
    setIsPhone(mediaQuery.matches);

    const handleResize = (event) => {
      setIsPhone(event.matches);
    };

    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  // return (
  //   <div className="flex flex-column w-full h-[90vh]">
  //     <div className="flex inset-y-0 left-0 basis-1/2 border-r border-gray-300">
  //       <Chat />
  //     </div>
  //     <div className="flex inset-y-0 right-0 basis-1/2 bg-white overflow-auto">
  //       {storyInfo && (
  //         <StreamText content={removeNumbersAndParentheses(storyInfo)} />
  //       )}
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="flex flex-col h-screen">
  //     <div className='overflow-auto h-1/2 mt-20'><Chat /></div>
  //     <div className='overflow-auto h-1/2 bg-white'>
  //       {storyInfo && (
  //         <StreamText content={removeNumbersAndParentheses(storyInfo)} />
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <>
    {!isPhone ? (
      <div className="flex flex-column w-full h-[90vh]">
        <div className="flex inset-y-0 left-0 basis-1/2 border-r border-gray-300">
          <Chat />
        </div>
        <div className="flex inset-y-0 right-0 basis-1/2 bg-white overflow-auto">
          {storyInfo && (
            <StreamText content={removeNumbersAndParentheses(storyInfo)} />
          )}
        </div>
      </div>
    ) : (
      <>
      <div className="flex flex-col h-screen">
        <div className='overflow-auto h-1/2 mt-16'><Chat /></div>
          <div className='overflow-auto h-1/2 bg-white mt-0'>
            {storyInfo && (
              <StreamText content={removeNumbersAndParentheses(storyInfo)} />
            )}
        </div>
      </div>
          
      </>
    )}
    </>
  );
};

const StreamText = ({ content }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [lastStreamedIndex, setLastStreamedIndex] = useState(0);

  useEffect(() => {
    let currentContent = '';

    const displayStream = async () => {
      for (let i = lastStreamedIndex; i <= content.length; i++) {
        currentContent = content.slice(0, i);
        setDisplayedContent(currentContent);
        setLastStreamedIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    };

    displayStream();
  }, [content, lastStreamedIndex]);

  return (
    <span>
      {displayedContent}
      <span className="blink-cursor">|</span>
    </span>
  );
};


export default StoryGenPage;
