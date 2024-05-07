import React from "react";

import { Pagination } from "antd";

interface IPaginationBlockArgs {
  countElementsOnPage: number;
  totalCount?: number;
  marginTop?: string;
}

export const useGetPaginationBlock = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const PaginationBlock = (args: IPaginationBlockArgs) => {
    const { totalCount, countElementsOnPage, marginTop } = args;

    const paginationBlockStyles = {
      marginTop: marginTop ?? "14vh",
      display: "flex",
      justifyContent: "center",
    };

    return (
      <Pagination
        style={paginationBlockStyles}
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
