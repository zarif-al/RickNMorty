import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import Image from "next/image";
import { Container, Row } from "react-bootstrap";
import styles from "../../styles/characters/characters_all.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "../../components/pagination";
import Spinner from "react-bootstrap/Spinner";
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

  const tabContentVariant2 = {
    active: (direction) => ({
      opacity: 1,
      x: [direction === 0 ? 0 : direction > 0 ? 50 : -50, 0],
      display: "grid",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.5,
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
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Container className={styles.mainContainer}>
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
                duration: 2,
              },
            },
            hidden: { opacity: 0 },
            exit: { opacity: 0 },
          }}
        >
          <h1 className={styles.header}>The Cast</h1>
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
          <div className={styles.loadingDiv}>
            <Spinner
              animation="border"
              role="status"
              className={styles.spinner}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className={styles.errorDiv}>
            <h1 className={styles.errorHeader}>Error</h1>
            {error.networkError.result.errors.map(({ message }, i) => (
              <span key={i} className={styles.errorMessages}>
                {message}
              </span>
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.charactersGrid}
            variants={tabContentVariant2}
            initial="inactive"
            custom={direction}
            animate={changing ? "inactive" : "active"}
            exit="exit"
          >
            {data.characters.results.map((character, index) => {
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
