import styles from "../styles/pagination.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
function Pagination({
  pageNumber,
  setPageNumber,
  formPageNumber,
  setFormPageNumber,
  totalPages,
  change,
  setDirection,
}) {
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.4,
          },
        },
        hidden: { opacity: 0 },
        exit: { opacity: 0 },
      }}
    >
      <div className={styles.pageOptions}>
        <div className={styles.pagination}>
          <span>Page</span>
          <div className={styles.paginationControlDiv}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              size="lg"
              color={pageNumber == 1 ? "lightgray" : "greenyellow"}
              className={styles.paginationButtons}
              onClick={() => {
                if (pageNumber - 1 > 0) {
                  setDirection(-1);
                  change();
                  setTimeout(() => {
                    setFormPageNumber(formPageNumber - 1);
                    setPageNumber(pageNumber - 1);
                  }, 400);
                }
              }}
            />
            <Form.Control
              type="number"
              min={1}
              max={totalPages}
              className={styles.pageInput}
              value={formPageNumber}
              onChange={(e) => {
                setFormPageNumber(parseInt(e.target.value));
              }}
              onBlur={(e) => {
                if (
                  parseInt(e.target.value) > 0 &&
                  parseInt(e.target.value) <= totalPages
                )
                  setPageNumber(parseInt(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    parseInt(e.target.value) > 0 &&
                    parseInt(e.target.value) <= totalPages
                  ) {
                    if (parseInt(e.target.value) > pageNumber) {
                      setDirection(1);
                      change();
                      setTimeout(() => {
                        setPageNumber(parseInt(e.target.value));
                      }, 400);
                    } else {
                      setDirection(-1);
                      change();
                      setTimeout(() => {
                        setPageNumber(parseInt(e.target.value));
                      }, 400);
                    }
                  }
                }
              }}
              onWheel={(e) => {
                e.target.blur();
              }}
              isInvalid={
                Number(formPageNumber) <= 0
                  ? true
                  : Number(formPageNumber) > totalPages
                  ? true
                  : false
              }
            />
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              size="lg"
              color={pageNumber < totalPages ? "greenyellow" : "lightgray"}
              className={styles.paginationButtons}
              onClick={() => {
                if (pageNumber + 1 <= totalPages) {
                  setDirection(1);
                  change();
                  setTimeout(() => {
                    setFormPageNumber(formPageNumber + 1);
                    setPageNumber(pageNumber + 1);
                  }, 400);
                }
              }}
            />
          </div>
          <span>of {totalPages}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Pagination;
