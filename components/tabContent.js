import styles from "../styles/TabContent.module.css";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
//Motion Framer Animation Variants
const tabContentVariant = {
  active: {
    transition: {
      delayChildren: 0.3,
    },
  },
};

const cardVariant = {
  active: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  inactive: (cardNo) => ({
    opacity: 0,
    x: cardNo === 1 ? -50 : cardNo === 2 ? 50 : 0,
    y: cardNo === 3 ? 50 : 0,
    transition: {
      duration: 0.3,
    },
  }),
};

function TabContent() {
  return (
    <motion.div
      role="tabpanel"
      variants={tabContentVariant}
      initial="inactive"
      animate="active"
      exit="inactive"
    >
      <div className={styles.cards}>
        <div>
          <motion.div variants={cardVariant} custom={1}>
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
          <motion.div variants={cardVariant} custom={2}>
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
        </div>
        <div>
          <motion.div variants={cardVariant} custom={3}>
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
      </div>
    </motion.div>
  );
}

export default TabContent;
