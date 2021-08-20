import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../../styles/TabContent.module.css";
import Link from "next/link";
const tabContentVariant2 = {
  active: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
  inactive: { opacity: 0 },
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
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function TabContent() {
  return (
    <motion.div
      role="tabpanel"
      className={styles.tabPanel}
      variants={tabContentVariant2}
      initial="inactive"
      animate="active"
    >
      <div className={styles.cards}>
        <motion.div variants={cardVariant}>
          <Link href="/characters/characters_all" passHref>
            <span className={styles.content_card}>
              <Image
                src="/characters.png"
                width={520}
                height={320}
                priority={true}
                alt="Rick and Morty Characters"
                className={styles.image}
              />
              <div className={styles.revealHeader}>Meet the Cast</div>
            </span>
          </Link>
        </motion.div>
        <motion.div variants={cardVariant}>
          <Link href="/episodes/episodes_all" passHref>
            <span className={styles.content_card}>
              <Image
                src="/episode.png"
                width={520}
                height={320}
                priority={true}
                className={styles.image}
                alt="episodes"
              />
              <div className={styles.revealHeader}>Episode Details</div>
            </span>
          </Link>
        </motion.div>
        <motion.div variants={cardVariant}>
          <Link href="/locations/locations_all" passHref>
            <span className={styles.content_card}>
              <Image
                src="/locations.png"
                width={520}
                height={320}
                priority={true}
                className={styles.image}
                alt="locations"
              />
              <div className={styles.revealHeader}>The Locations</div>
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TabContent;
