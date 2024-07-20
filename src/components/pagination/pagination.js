import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  const pageItems = [];

  if (totalPages > 5) {
    if (currentPage > 2) {
      pageItems.push(
        <Pagination.Item key={0} onClick={() => handlePageChange(0)}>
          1
        </Pagination.Item>
      );
      if (currentPage > 3) {
        pageItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 3) {
      if (currentPage < totalPages - 4) {
        pageItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pageItems.push(
        <Pagination.Item
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
  } else {
    for (let i = 0; i < totalPages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
  }

  return (
    <div className="pagination-container mt-4">
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
