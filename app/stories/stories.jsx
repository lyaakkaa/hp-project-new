import React from 'react';
import Story from './story';

const Stories = () => {
  return (
    <div className="wrapper absolute inset-0 overflow-auto">
      <div className="z-10 flex flex-wrap">
        <Story imageUrl="dobby.jpg" title="Create story" link="/chat" />
      </div>
    </div>

  );
};

export default Stories;
