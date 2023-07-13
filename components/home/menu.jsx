import React from 'react';
import Card from '../Card';

const menu = () => {
  return (
    <div className="absolute inset-0 overflow-auto bg-black">
      <div className="absolute inset-0 flex flex-col">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="z-10 flex flex-wrap">
          <Card imageUrl="dobby.jpg" title="Create story" link="/chat" />
          <Card imageUrl="trio.jpg" title="My stories" link="/stories" />
          <Card imageUrl="hagrid.webp" title="Quizes" link="/quiz" />
        </div>
      </div>
    </div>
  );
}

export default menu;
