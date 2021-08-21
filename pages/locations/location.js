import React from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CharacterGrid from "../../components/characterGrid";
const Location = ({ data }) => {
  const location = data.location;
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
            <h1>{location.name}</h1>
          </div>
        </motion.div>
        <motion.div variants={table}>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Type</th>
                <td>{location.type}</td>
              </tr>
              <tr>
                <th>Dimension</th>
                <td>{location.dimension}</td>
              </tr>
              <tr>
                <th>Database Entry</th>
                <td>{new Date(location.created).toUTCString()}</td>
              </tr>
            </tbody>
          </Table>
        </motion.div>
        {location.residents.length != 0 ? (
          <>
            <motion.div className="castHeader" variants={header}>
              <h1>Residents</h1>
            </motion.div>
            <CharacterGrid characters={location.residents} source="location" />
          </>
        ) : (
          <motion.div className="castHeader" variants={header}>
            <h1>This location is uninhabited!</h1>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default Location;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query {
        location(id: ${id}) {
          name
          type
          dimension
          residents {
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
