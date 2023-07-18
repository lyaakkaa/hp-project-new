import React from 'react';

const SingleCard = ({ card, handleChoice, flipped }) => {

    const handleClick = () => {
        handleChoice(card)
    }

    
    return (
        <div className="relative">
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>
            <img
                src={card.src}
                className="front w-full block border-2 border-white rounded-md"
                alt="card front"
                width={80}
                height={80}
            />
            <img
                src="/cover.png"
                className="back w-full block border-2 border-white rounded-md"
                alt="card back"
                width={50}
                onClick={handleClick}
            />
            </div>
        </div>
        </div>
    );
};

export default SingleCard;
