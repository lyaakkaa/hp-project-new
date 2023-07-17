
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
      const response = await axios.get(`http://localhost:8000/stories/${localStorage.getItem("story_id")}`, {
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

  return (
    <div className="flex flex-column w-full h-[90vh]">
      <div className="flex inset-y-0 left-0 basis-1/3 border-r border-gray-300">
        <Chat />
      </div>
      <div className="flex inset-y-0 right-0 basis-2/3 bg-white overflow-auto">
        {storyInfo && (
          <StreamText content={removeNumbersAndParentheses(storyInfo)} />
        )}
      </div>
    </div>
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
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    };

    displayStream();
  }, [content, lastStreamedIndex]);

  return <>{displayedContent}</>;
};


export default StoryGenPage;
