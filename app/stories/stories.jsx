'use client'
import Story from './story';
import Link from 'next/link';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const slides = [
  {"title": "Story 1", "link": "/chat"},
  {"title": "Story 2", "link": "/chat"},
  {"title": "Story 3", "link": "/chat"},
  {"title": "Story 4", "link": "/chat"},
  {"title": "Story 5", "link": "/chat"},
  {"title": "Story 6", "link": "/chat"},
  {"title": "Story 7", "link": "/chat"},
];

const Stories = () => {
  const [stories, setStories] = useState(null)
  const didFetchRef = useRef(false)
  const [selectedSlide, setSelectedSlide] = useState(0);

  useEffect(() => {
    if(didFetchRef.current == false){
      didFetchRef.current = true
      fetchStories()
      print(stories)
    }
  }, [stories])

  const fetchStories = async () => {
    let path = "/"
    const res = await axios.get("http://localhost:8000/stories/", {
      method: 'GET',
      headers: { "accept": "application/json",
                 "Authorization": "Bearer " + localStorage.getItem('token'),
      }})
    const stories_inp = await res.data.stories
    setStories(stories_inp)
    console.log("stories:", stories_inp)
  }


  const handlePreviousSlide = () => {
    setSelectedSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setSelectedSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="wrapper absolute inset-0 overflow-hidden">
      <div className="z-10 flex flex-wrap justify-center items-center">
        <Carousel selectedItem={selectedSlide} showArrows={false} showThumbs={false}>
          {stories && stories.map((story) => (
            <Story
              key={story._id}
              title={story.title}
              link={`/stories/${story._id}`}
              text={story.content.substring(0, 50)+'...'}
            />
          ))}
        </Carousel>
        <div className="absolute top-1/2 left-2">
          <button onClick={handlePreviousSlide} className="bg-gray-200 px-3 py-2 rounded-full text-lg">
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-2">
          <button onClick={handleNextSlide} className="bg-gray-200 px-3 py-2 rounded-full text-lg">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
