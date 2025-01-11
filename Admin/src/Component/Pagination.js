import React from "react";
import "../Css/Complainmanagement.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, onPageChange, hasMore }) => {
  return (
    <div className="complain-pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <IoIosArrowBack />
      </button>
      <button onClick={() => onPageChange(page + 1)} disabled={!hasMore}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
