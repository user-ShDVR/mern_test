import { Pagination } from "antd";
import React from "react";

interface PaginationBlockArgs {
  totalDataCount: number;
  countElementsOnPage: number;
}

export const useGetPaginationBlock = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const styles = {
    marginTop: "14vh",
    display: "flex",
    justifyContent: "center",
  };

  const PaginationBlock = (args: PaginationBlockArgs) => {
    const { totalDataCount, countElementsOnPage } = args;

    return (
      <Pagination
        style={styles}
        defaultCurrent={1}
        defaultPageSize={countElementsOnPage}
        total={totalDataCount}
        showSizeChanger={false}
        onChange={handlePageChange}
        current={currentPage}
      />
    );
  };

  return { currentPage, PaginationBlock };
};
