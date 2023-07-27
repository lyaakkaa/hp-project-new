import React from 'react';

const SingleCard = ({ card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if (!disabled){
            handleChoice(card)
        }
    }

    
    // return (
    //     <div className="relative">
    //     <div className="card">
    //         <div className={flipped ? 'flipped' : ''}>
    //         <img
    //             src={card.src}
    //             className="front block border-2 border-white rounded-md"
    //             alt="card front"
    //             width={100}
    //         />
    //         <img
    //             src="/cover.png"
    //             className="back block border-2 border-white rounded-md"
    //             alt="card back"
    //             width={100}
    //             onClick={handleClick}
    //         />
    //         </div>
    //     </div>
    //     </div>
    // );
    return (
        <div className="relative">
          <div className="card md:w-[100px] lg:w-[120px]">
            <div className={flipped ? 'flipped' : ''}>
              <img
                src={card.src}
                className="front block border-2 border-white rounded-md w-full"
                alt="card front"
              />
              <img
                src="/cover.png"
                className="back block border-2 border-white rounded-md w-full"
                alt="card back"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
    );
      
};

export default SingleCard;
