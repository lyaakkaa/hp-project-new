import React from 'react';
import Link from 'next/link';

const Card = ({ imageUrl, title, link }) => {
  const textGradientStyle = {
    backgroundImage: "linear-gradient(to left, #cb9b51 22%, #f6e27a 45%, #f6e27a 55%, #cb9b51 78%)",
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-48">
      <img className="w-96 h-64 object-cover" src={imageUrl} alt="Card Image" /> {/* Set the desired width (e.g., w-96) */}
      <div className="p-2 pb-5 flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <Link
          href={link}
          className="text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 hover:text-black"
          style={textGradientStyle}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
