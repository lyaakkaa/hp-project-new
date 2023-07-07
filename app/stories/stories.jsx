'use client'
import { useState } from 'react';
import Story from './story';
import Link from 'next/link';

import "react-responsive-carousel/lib/styles/carousel.min.css";
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
  const [selectedSlide, setSelectedSlide] = useState(0);

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
          {slides.map((story) => (
            <Story
              key={story.title}
              title={story.title}
              link={story.link}
              text='asdsdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasdas asd'
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
