'use client'
import React from 'react';
import Story from './story';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef, useState } from 'react';
import styles from '../styles';

function removeNumbersAndParentheses(text) {
  const regex = /[0-9()"$]/g;
  return text.replace(regex, '');
}

const Stories = () => {
  const [stories, setStories] = useState(null)
  const didFetchRef = useRef(false)

  useEffect(() => {
    if (didFetchRef.current === false) {
      didFetchRef.current = true
      fetchStories()
    }
  }, [stories])

  const fetchStories = async () => {
    let path = "/"
    const res = await axios.get("https://fastapi-ht4s.onrender.com/stories/", {
      method: 'GET',
      headers: {
        "accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token'),
      }
    })
    const stories_inp = await res.data.stories
    setStories(stories_inp)
    console.log("stories:", stories_inp)
  }


  return (
    <div className={`${styles.paddings} bg-primary-black absolute inset-0 overflow-x-hidden`}>
      {stories && stories.length > 0 ? (

        stories.map((story, index) => (
          <Story
            key={index}
            number={index + 1}
            title={removeNumbersAndParentheses(story.title) || `Story ${index + 1}`}
            link={`/stories/${story._id}`}
            text={story.content.substring(0, 50) + '...'}
            id={story._id}
          />
        ))
      ) : (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src='/pusheen-harry-potter.gif' alt="Centered GIF" width={150}/>
            <p className='text-white text-center'>No stories</p>
          </div>
        </>
        
      )}
    </div>
  );
  
};

export default Stories;
