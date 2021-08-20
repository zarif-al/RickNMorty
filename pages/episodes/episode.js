import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import styles from "../../styles/episodes/episode.module.css";
import client from "../../apollo-client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
const Episode = ({ data }) => {
  const episode = data.episode;
  const tabContentVariant2 = {
    active: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
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
  const main = {
    active: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
    inactive: { opacity: 0 },
  };
  const header = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };
  const image = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };
  const table = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Container className={styles.mainContainer}>
      <motion.div
        variants={main}
        initial="inactive"
        animate="active"
        exit="inactive"
      >
        <motion.div variants={header}>
          <div className={styles.header}>
            <h1>{episode.name}</h1>
          </div>
        </motion.div>
        <motion.div variants={table}>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Air Date</th>
                <td>{episode.air_date}</td>
              </tr>
              <tr>
                <th>Episode</th>
                <td>{episode.episode}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{episode.created}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{episode.created.split("T")[0]}</td>
              </tr>
            </tbody>
          </Table>
        </motion.div>
        <motion.div className={styles.castHeader} variants={header}>
          <h1>The Cast in this Episode</h1>
        </motion.div>
        <motion.div
          className={styles.charactersGrid}
          variants={tabContentVariant2}
        >
          {episode.characters.map((character, index) => {
            return (
              <motion.div key={index} variants={cardVariant}>
                <Link
                  href={`/characters/character/?id=${character.id}`}
                  passHref
                >
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
          })}
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Episode;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query {
        episode(id: ${id}) {
          id
          name
          air_date
          episode
          characters {
            id
            name
            image
          }
          created
        }
      }
    `,
  });
  return { props: { data } };
}
