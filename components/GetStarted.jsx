'use client';


import { motion } from 'framer-motion';
import styles from '@/app/styles';
import { staggerContainer, fadeIn, magicVariants } from '../utils/motion';
import { TitleText, TypingText } from "./CustomTexts";
import StartSteps from './StartSteps';

const startingFeatures = [
    "Endless Inspiration",
    "An in-depth immersion into the world of Harry Potter",
    "Learning English",
];


const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-03 z-0"/>
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{once: false, amount: 0.25}}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div 
        variants={magicVariants('left')}
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
        <TitleText title={<>Our features</>} />
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
