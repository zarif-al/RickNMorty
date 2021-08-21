import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Pagination from "../../components/pagination";
import Spinner from "react-bootstrap/Spinner";
import CharacterGrid from "../../components/characterGrid";
const AllCharacters = ({ totalPages }) => {
  //Temporary Fix for pagination changes
  const [pageNumber, setPageNumber] = useState(1);
  const [formPageNumber, setFormPageNumber] = useState(1);
  const [direction, setDirection] = useState(0);
  const [changing, setChanging] = useState(false);
  const CHARACTERS = gql`
    query {
      characters(page: ${pageNumber}) {
        results {
          id
          name
          image
        }
        info{
           next
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(CHARACTERS);
  function change() {
    setChanging(true);
    setTimeout(() => {
      setChanging(false);
    }, 400);
  }

  return (
    <Container className="mainContainer">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          visible: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.3,
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
          <h1 className="header">The Cast</h1>
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
          <CharacterGrid
            characters={data.characters.results}
            direction={direction}
            changing={changing}
            source="characters_all"
          />
        )}
      </motion.div>
    </Container>
  );
};

export default AllCharacters;
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            pages
          }
        }
      }
    `,
  });
  const totalPages = data.characters.info.pages;
  return {
    props: {
      totalPages,
    },
  };
}
