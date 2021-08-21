import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import TabContent from "../components/tabContent";
import React, { useState } from "react";
export default function Home() {
  return (
    <Container className="container" fluid>
      <motion.div
        className="header"
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