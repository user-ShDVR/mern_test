import React from "react";

import { Pagination } from "antd";

interface IPaginationBlockArgs {
  countElementsOnPage: number;
  totalCount?: number;
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

  const PaginationBlock = (args: IPaginationBlockArgs) => {
    const { totalCount, countElementsOnPage } = args;

    return (
      <Pagination
        style={styles}
        defaultCurrent={1}
        defaultPageSize={countElementsOnPage}
        total={totalCount}
        showSizeChanger={false}
        onChange={handlePageChange}
        current={currentPage}
      />
    );
  };

  return { currentPage, PaginationBlock };
};
