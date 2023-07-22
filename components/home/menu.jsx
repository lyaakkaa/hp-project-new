import React from 'react';
import Card from '../Card';
import styles from '@/app/styles';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import { TypingText, TitleText } from '../CustomTexts';
import ExploreCard from '../ExploreCard';
import { useState } from 'react';
import About from '../About';
import Hero from '../Hero';
import GetStarted from '../GetStarted';


export const cards = [
  {
    id: 'world-1',
    imgUrl: 'world1.jpg',
    title: 'Create story',
    link: "/chat",
  },
  {
    id: 'world-2',
    imgUrl: 'wo2jpg.jpg',
    title: 'My stories',
    link: "/stories",
  },
  {
    id: 'world-3',
    imgUrl: 'w3.jpg',
    title: 'Games',
    link: "/quiz",
  },
];

const menu = () => {

  const [active, setActive] = useState('world-1');

  return (

    <div className={`${styles.paddings} bg-primary-black absolute inset-0 overflow-x-hidden`}>
      <div className="gradient-04 z-0"/>
      <div className="gradient-06 z-0"/>
      <Hero/>
      <About/>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText
          title={<>Choose the world you want <br className="md:block hidden" /> to explore</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {cards.map((card, index) => (
            <ExploreCard
              key={card.id}
              {...card}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
      <GetStarted/>
    </div>
  
  );
}

export default menu;
