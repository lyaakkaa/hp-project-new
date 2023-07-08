import React from 'react';
import Link from 'next/link';

const Story = ({ title, link, text }) => {
  return (
    <div className="max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden mt-48 p-10 h-80 w-80" style={{ backgroundImage: "url('/oldbook.jpg')", backgroundPosition: "center" }}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 mb-4" style={{ wordBreak: 'break-word' }}>
        <span className="text-2xl font-bold text-blue-500">{text.charAt(0)}</span>
        {text.slice(1)}
      </p>
      <Link href={link}>
        <p className="text-blue-500 font-semibold hover:underline">Read More</p>
      </Link>
    </div>
  );
};




export default Story;
