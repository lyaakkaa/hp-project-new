import React from 'react';
import Link from 'next/link';

const Story = ({ title, link, text }) => {
  const buttonStyle = {
    backgroundImage: "linear-gradient(to right, #8e634b, #c2a16e, #e3d594, #c2a16e, #8e634b)",
    color: "black",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    position: "relative",
    overflow: "hidden",
  };

  const articleStyle = {
    fontFamily: "IBM Plex Mono",
  };

  return (
    <div className="max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden mt-48 p-10 h-80 w-80" style={{ backgroundImage: "url('/oldbook.jpg')", backgroundPosition: "center" }}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <article style={articleStyle}>
        <p className="text-gray-700 mb-4" style={{ wordBreak: 'break-word' }}>
          <span className="text-[35px] leading-[70px] font-bold ">{text.charAt(0)}</span>
          {text.slice(1)} 
        </p>
      </article>
      <Link href={link}>
        <button style={buttonStyle}>Read More</button>
      </Link>
    </div>
  );
};

export default Story;
