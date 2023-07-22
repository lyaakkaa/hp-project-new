'use client';

import { motion } from "framer-motion";
import { TypingText } from "./CustomTexts";
import styles from "@/app/styles";
import { fadeIn, staggerContainer } from '../utils/motion'


const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0"/>
    <div className="gradient-03 z-0"/>
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{once: false, amount: 0.25}}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Magic Pen" textStyles='text-center'/>
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">Magic Pen</span> is an exciting application 
        that uses artificial intelligence to generate unique and exciting stories in the world of Harry Potter. 
        Immerse yourself in a magical universe, creating your own adventures and meeting familiar characters in {' '}
        <span className="font-extrabold text-white">
            amazing and unexpected plots.
        </span>{' '}
      </motion.p>
      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
