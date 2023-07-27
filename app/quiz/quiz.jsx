'use client'
import React, { useEffect, useState } from 'react';
import SingleCard from './singleCard';

const cardImages = [
    {'src': '/card1.avif', matched: false},
    {'src': '/Ron-Weasley.jpg', matched: false},
    {'src': '/hermione-granger.png', matched: false},
    {'src': '/dob.jpg', matched: false},
    {'src': '/tom_felton.jpg', matched: false},
    {'src': '/card6.webp', matched: false},
]

const Quiz = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards 
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (

    <div className="flex flex-col items-center justify-center">
      <button
        onClick={shuffleCards}
        className="bg-transparent border-2 border-white py-2 px-4 rounded-md text-white font-bold cursor-pointer text-lg hover:bg-pink-500 hover:text-white mb-4"
      >
        New Game
      </button>
      <div className="flex-1">
        <div className="card-grid mt-10 grid grid-cols-4 gap-5">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <p className='text-white'>Turns: {turns}</p>
    </div>
  );
};

export default Quiz;
