import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import TabContent from "../components/tab/tabContent";
import React, { useState } from "react";
export default function Home() {
  const [identifier, setIdentifier] = useState(null);
  return (
    <Container className={styles.container} fluid>
      <motion.div
        className={styles.header}
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        variants={{
          visible: {
            opacity: 1,
            duration: 1,
          },
          hidden: { opacity: 0 },
          exit: {
            opacity: 0,
            duration: 1,
          },
        }}
      >
        <h1>Rick And Morty</h1>
      </motion.div>
      <motion.div
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        variants={{
          visible: {
            opacity: 1,
          },
          hidden: { opacity: 0 },
          exit: {
            opacity: 0,
          },
        }}
      >
        <TabContent />
      </motion.div>
    </Container>
  );
}
