import React from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({
  recipesPerPage,
  totalRecipes,
  paginate,
  paginateCurrentPage,
}) {
  const pageNumbers = [];
  const maxPage = Math.ceil(totalRecipes / recipesPerPage);
  const prevPage = Math.max(1, paginateCurrentPage - 1);
  const nextPage = Math.min(maxPage, paginateCurrentPage + 1);

  for (let i = 0; i <= maxPage + 1; i++) {
    if (i == 0) {
      pageNumbers.push("<");
    } else if (i == maxPage + 1) {
      pageNumbers.push(">");
    } else if (
      i == 1 ||
      (i >= -2 + paginateCurrentPage && i <= 2 + paginateCurrentPage) ||
      i == maxPage
    ) {
      pageNumbers.push(i);
    } else if (
      i > 1 &&
      (i == -3 + paginateCurrentPage || i == 3 + paginateCurrentPage) &&
      i < maxPage
    ) {
      pageNumbers.push("•••");
    }
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) =>
          number == "•••" ? (
            <a className={styles.pageEllipsis}>{number}</a>
          ) : number == "<" ? (
            <li key={number} className={styles.pageItem}>
              <a
                onClick={() => paginate(prevPage)}
                href="#!"
                className={styles.pageLink}
              >
                {number}
              </a>
            </li>
          ) : number == ">" ? (
            <li key={number} className={styles.pageItem}>
              <a
                onClick={() => paginate(nextPage)}
                href="#!"
                className={styles.pageLink}
              >
                {number}
              </a>
            </li>
          ) : (
            <li key={number} className={styles.pageItem}>
              <a
                onClick={() => paginate(number)}
                href="#!"
                className={styles.pageLink}
              >
                {number}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
