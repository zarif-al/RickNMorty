import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import styles from "../../styles/Nav.module.css";
function Navigation({ display, activeKey }) {
  return (
    <motion.header
      className={styles.navContainer}
      animate={display ? "visible" : "hidden"}
      initial="hidden"
      variants={{
        visible: {
          opacity: 1,
          transition: { duration: 0.3 },
        },
        hidden: {
          opacity: 0,
          transition: { duration: 0.3 },
        },
      }}
    >
      <div>
        <motion.nav
          className={styles.custom_nav}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.3 },
            },
            hidden: {
              opacity: 0,
              transition: { duration: 0.3 },
            },
          }}
        >
          <Link href="/characters/characters_all" passHref>
            <a
              className={
                activeKey === "/characters/characters_all"
                  ? styles.links + " " + styles.active
                  : styles.links
              }
            >
              Characters
            </a>
          </Link>
          <Link href="/episodes/episodes_all" passHref>
            <a
              className={
                activeKey === "/episodes/episodes_all"
                  ? styles.links + " " + styles.active
                  : styles.links
              }
            >
              Episodes
            </a>
          </Link>
          <Link href="/locations/locations_all" passHref>
            <a
              className={
                activeKey === "/locations/locations_all"
                  ? styles.links + " " + styles.active
                  : styles.links
              }
            >
              Locations
            </a>
          </Link>
        </motion.nav>
      </div>
    </motion.header>
  );
}

export default Navigation;
