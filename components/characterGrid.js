import styles from "../styles/characters/characterGrid.module.css";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
//Motion Framer Animation Variants
const characters_all_grid = {
  active: (direction) => ({
    opacity: 1,
    x: [direction === 0 ? 0 : direction > 0 ? 50 : -50, 0],
    display: "grid",
    transition: {
      type: "tween",
      duration: 0.2,
      delay: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  }),
  inactive: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: {
      type: "tween",
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  }),
  exit: { opacity: 0 },
};
const cardVariant = {
  active: {
    opacity: 1,
    scale: [0, 1],
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};
const characters_grid = {
  active: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  inactive: { opacity: 0 },
};
const CharacterGrid = ({ characters, direction, changing, source }) => {
  //Return an array of divs for each character
  function getCharacterCards() {
    const characterCards = characters.map((character, index) => {
      return (
        <motion.div key={index} variants={cardVariant}>
          <Link href={`/characters/character/${character.id}`} passHref>
            <span className={styles.cardItem}>
              <Image
                src={character.image}
                width={160}
                height={160}
                priority={true}
                alt={character.name}
                className={styles.image}
              />
              <a className={styles.link}>{character.name}</a>
            </span>
          </Link>
        </motion.div>
      );
    });
    return characterCards;
  }
  //Character Grid for characters_all page has a different configuration for animation.
  if (source === "characters_all") {
    return (
      <motion.div
        className={styles.charactersGrid}
        variants={characters_all_grid}
        initial="inactive"
        custom={direction}
        animate={changing ? "inactive" : "active"}
        exit="exit"
      >
        {getCharacterCards()}
      </motion.div>
    );
  } else {
    return (
      <motion.div className={styles.charactersGrid} variants={characters_grid}>
        {getCharacterCards()}
      </motion.div>
    );
  }
};

export default CharacterGrid;
