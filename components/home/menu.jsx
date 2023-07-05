import React from 'react';
import Card from '../Card';

const menu = () => {
  return (
    <div className="wrapper absolute inset-0 overflow-auto bg-black">
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="z-10 flex flex-wrap">
          <Card imageUrl="dobby.jpg" title="Create story" link="/chat" />
          <Card imageUrl="trio.jpg" title="My stories" link="/path/to/page2" />
          <Card imageUrl="hagrid.webp" title="Card 3" link="/path/to/page3" />
        </div>
      </div>
    </div>
  );
}

export default menu;
