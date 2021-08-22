import React from "react";
import { gql } from "@apollo/client";
import styles from "../../../styles/characters/character.module.css";
import client from "../../../apollo-client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
const Character = ({ data }) => {
  const character = data.character;
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
    <Container className="mainContainer">
      <motion.div
        variants={main}
        initial="inactive"
        animate="active"
        exit="inactive"
      >
        <motion.div variants={image}>
          <div className={styles.imageContainer}>
            <Image
              src={character.image}
              width={300}
              height={300}
              priority={true}
              alt={character.name}
              className={styles.image}
            />
          </div>
        </motion.div>
        <motion.div variants={header}>
          <div className="header">
            <h1>{character.name}</h1>
          </div>
        </motion.div>
        <motion.div variants={table}>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Status</th>
                <td>{character.status}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{character.species}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{character.type == "" ? "Unknown" : character.type}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{character.gender}</td>
              </tr>
              <tr>
                <th>Origin</th>
                <td>
                  {character.origin.id == null ? (
                    character.origin.name
                  ) : (
                    <Link
                      href={`/locations/location/${character.origin.id}`}
                      passHref
                    >
                      <a className="link">{character.origin.name}</a>
                    </Link>
                  )}
                </td>
              </tr>
              <tr>
                <th>Last Known Location</th>
                <td>
                  {character.location.id === null ? (
                    character.location.name
                  ) : (
                    <Link
                      href={`/locations/location/${character.location.id}`}
                      passHref
                    >
                      <a className="link">{character.location.name}</a>
                    </Link>
                  )}
                </td>
              </tr>
              <tr>
                <th>Episode(s)</th>
                <td>
                  {character.episode.map((episode, index) => {
                    return (
                      <span key={index}>
                        <Link href={`/episodes/episode/${episode.id}`} passHref>
                          <a className="link">{episode.name}</a>
                        </Link>
                        {index != character.episode.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <th>Database Entry</th>
                <td>{new Date(character.created).toUTCString()}</td>
              </tr>
            </tbody>
          </Table>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Character;
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
        }
      }
    `,
  });

  const count = Number(data.characters.info.count);
  let paths = [];
  for (var i = 1; i <= count; i++) {
    paths.push({ params: { id: i.toString() } });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query {
        character(id: ${params.id}) {
          id
          name
          status
          species
          type
          gender
          origin {
            id
            name
          }
          location {
            id
            name
          }
          image
          episode {
            id
            name
          }
          created
        }
      }
    `,
  });
  return { props: { data } };
}
