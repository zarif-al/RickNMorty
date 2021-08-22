import React from "react";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CharacterGrid from "../../../components/characterGrid";
const Episode = ({ data }) => {
  const episode = data.episode;
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
        style={{ width: "100%" }}
      >
        <motion.div variants={header}>
          <div className="header">
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
                <th>Database Entry</th>
                <td>{new Date(episode.created).toUTCString()}</td>
              </tr>
            </tbody>
          </Table>
        </motion.div>
        <motion.div className="castHeader" variants={header}>
          <h3>Characters seen in this Episode</h3>
        </motion.div>
        <CharacterGrid characters={episode.characters} source="episode" />
      </motion.div>
    </Container>
  );
};

export default Episode;
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        episodes(page: 1) {
          info {
            count
            pages
          }
        }
      }
    `,
  });

  const count = Number(data.episodes.info.count);
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
        episode(id: ${params.id}) {
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
