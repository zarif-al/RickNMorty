import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import { Container, Row } from "react-bootstrap";
import styles from "../../styles/episodes/episodes_all.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "../../components/pagination";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
const AllLocations = ({ totalPages }) => {
  //Temporary Fix for pagination changes
  const [pageNumber, setPageNumber] = useState(1);
  const [formPageNumber, setFormPageNumber] = useState(1);
  const [direction, setDirection] = useState(0);
  const [changing, setChanging] = useState(false);
  const LOCATIONS = gql`
    query {
      locations(page: 1) {
        results {
          id
          name
          type
          dimension
          residents {
            name
          }
          created
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(LOCATIONS);
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
      display: "block",
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
  const table = {
    active: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Container className={styles.mainContainer}>
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
                duration: 2,
              },
            },
            hidden: { opacity: 0 },
            exit: { opacity: 0 },
          }}
        >
          <h1 className={styles.header}>All Locations</h1>
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
          <div className={styles.table}>
            <motion.div
              className={styles.table}
              variants={tabContentVariant2}
              initial="inactive"
              custom={direction}
              animate={changing ? "inactive" : "active"}
              exit="exit"
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.locations.results.map((location, index) => {
                    return (
                      <tr key={index}>
                        <td>{location.type}</td>
                        <td>
                          <Link href={`/locations/location/?id=${location.id}`}>
                            {location.name}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default AllLocations;
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        locations(page: 1) {
          info {
            pages
          }
        }
      }
    `,
  });
  const totalPages = data.locations.info.pages;
  return {
    props: {
      totalPages,
    },
  };
}
