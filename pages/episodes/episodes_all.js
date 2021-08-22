import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { Container, Row } from "react-bootstrap";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "../../components/pagination";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
const AllEpisodes = ({ totalPages }) => {
  //Temporary Fix for pagination changes
  const [pageNumber, setPageNumber] = useState(1);
  const [formPageNumber, setFormPageNumber] = useState(1);
  const [direction, setDirection] = useState(0);
  const [changing, setChanging] = useState(false);
  const EPISODES = gql`
   query {
      episodes(page: ${pageNumber}) {
        results{
            id
            name
            episode
        }   
      }
    }
  `;
  const { loading, error, data } = useQuery(EPISODES);
  function change() {
    setChanging(true);
    setTimeout(() => {
      setChanging(false);
    }, 400);
  }
  const tableVariant = {
    active: (direction) => ({
      opacity: 1,
      x: [direction === 0 ? 0 : direction > 0 ? 50 : -50, 0],
      display: "block",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.4,
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
  return (
    <Container className="mainContainer">
      <motion.div
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        transition={{ duration: 0.3 }}
        variants={{
          visible: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.12,
            },
          },
        }}
      >
        <motion.div
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
            hidden: { opacity: 0 },
            exit: { opacity: 0 },
          }}
        >
          <h1 className="header">All Episodes</h1>
        </motion.div>
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          formPageNumber={formPageNumber}
          setFormPageNumber={setFormPageNumber}
          totalPages={totalPages}
          change={change}
          setDirection={setDirection}
        />
        {loading ? (
          <div className="loadingDiv">
            <Spinner animation="border" role="status" className="spinner">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="errorDiv">
            <h1 className="errorHeader">Error</h1>
            {error.networkError.result.errors.map(({ message }, i) => (
              <span key={i} className="errorMessages">
                {message}
              </span>
            ))}
          </div>
        ) : (
          <motion.div
            variants={tableVariant}
            initial="inactive"
            custom={direction}
            animate={changing ? "inactive" : "active"}
            exit="exit"
          >
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {data.episodes.results.map((episode, index) => {
                  return (
                    <tr key={index}>
                      <td>{episode.episode}</td>
                      <td>
                        <Link href={`/episodes/episode/${episode.id}`} passHref>
                          <a className="link">{episode.name}</a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default AllEpisodes;
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        episodes(page: 1) {
          info {
            pages
          }
        }
      }
    `,
  });
  const totalPages = data.episodes.info.pages;
  return {
    props: {
      totalPages,
    },
  };
}
