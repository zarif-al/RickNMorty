import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import styles from "../../styles/episodes/episode.module.css";
import client from "../../apollo-client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
const Location = ({ data }) => {
  const location = data.location;
  const generateTable = () => {
    const rows = [];
    for (const [key, value] of Object.entries(data.character)) {
      if (key != "episode" && key != "origin" && key != "location") {
        console.log(`${key}: ${value}`);
        rows.push(
          <tr>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        );
      }
    }
    return rows;
  };
  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{location.name}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{location.type}</td>
          </tr>
          <tr>
            <th>Dimension</th>
            <td>{location.dimension}</td>
          </tr>
          <tr>
            <th>Characters</th>
            <td>
              {location.residents.map((character, index) => {
                return (
                  <span key={index}>
                    <Link href={`/characters/character/?id=${character.id}`}>
                      {character.name}
                    </Link>
                    {index != location.residents.length - 1 ? ", " : ""}
                  </span>
                );
              })}
            </td>
          </tr>
          <tr>
            <th>Created</th>
            <td>{location.created}</td>
          </tr>
          <tr>
            <th>Created</th>
            <td>{location.created.split("T")[0]}</td>
          </tr>
        </tbody>
      </Table>
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
            name
          }
          created
        }
      }
    `,
  });
  return { props: { data } };
}
