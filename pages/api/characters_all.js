// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import client from "../../apollo-client";
export default function handler(req, res) {
  if (req.method === "GET") {
    return new Promise(async (resolve, reject) => {
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
      res.status(200).json({ data });
    });
  }
}
