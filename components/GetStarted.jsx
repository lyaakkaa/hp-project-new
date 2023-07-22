'use client';


import { motion } from 'framer-motion';
import styles from '@/app/styles';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import { TitleText, TypingText } from "./CustomTexts";
import StartSteps from './StartSteps';

const startingFeatures = [
    "Endless Inspiration: Magic Pen provides the user with an unlimited stream of fascinating stories that can be used for creative inspiration. It's a great way to develop your writing skills and experiment with different plots and characters",
    "An in-depth immersion into the world of Harry Potter: Magic Pen allows Harry Potter fans to continue to enjoy this beautiful universe even after completing a series of books and films.",
    "Learning English: Magic Pen helps English language learners develop their reading and comprehension skills in English.",
];


const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{once: false, amount: 0.25}}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div 
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src='/ball.png'
          alt='getstarted'
          className='w-[90%] h-[90%] object-contain'
        />
      </motion.div>
      
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] flex justify-center flex-col'
      >
        <TypingText title="| Why should I use Magic Pen?"/>
        <TitleText title={<>Get started with just a few clicks</>} />
        <div className='mt-[31px] flex flex-col max-w-[370px] gap-[24px]'>
          {startingFeatures.map((feature, index) => (
            <StartSteps
              key={feature}
              number={`${index < 10 ? '0' : ''} ${index + 1}`}
              text={feature}
            />
          ))}
        </div>

      </motion.div>

    </motion.div>
  </section>
);

export default GetStarted;
