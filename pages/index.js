import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import TabContent from "../components/tabContent";
import React from "react";
export default function Home() {
  return (
    <Container className="container" fluid>
      <motion.div
        className="indexHeader"
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        variants={{
          visible: {
            opacity: 1,
            duration: 1,
            y: 0,
          },
          hidden: { opacity: 0, y: -100 },
          exit: {
            opacity: 0,
            duration: 1,
            y: -100,
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
