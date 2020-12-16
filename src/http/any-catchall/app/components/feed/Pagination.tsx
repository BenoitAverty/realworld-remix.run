import React, { FC } from "react";
import { Link } from "react-router-dom";

type PaginationProps = {
  page: number;
  totalPages: number;
};

const Pagination: FC<PaginationProps> = function Pagination({ page, totalPages }) {
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <li key={i} className={`page-item${i === page ? " active" : ""}`}>
        <Link to={`?page=${i}`} className="page-link">
          {i}
        </Link>
      </li>,
    );
  }

  return (
    <nav>
      <ul className="pagination">
        {pageLinks}
      </ul>
    </nav>
  );
};

export default Pagination;
