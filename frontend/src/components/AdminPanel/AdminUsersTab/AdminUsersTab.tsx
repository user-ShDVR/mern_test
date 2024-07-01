import { Pagination, Spin, Typography } from "antd";

import { useGetUsersQuery } from "store/api/users/users-api";

import { useContexts } from "hooks/general/use-contexts";

import { getDeclination } from "utils/get-declination";

import styles from "./AdminUsersTab.module.scss";
import { UsersTabTable } from "./UsersTabTable/UsersTabTable";

export const AdminUsersTab = () => {
  const {
    currentPageContext: { currentPage, setCurrentPage },
  } = useContexts();

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: currentPage,
    limit: 5,
  });

  const isEmptyUsersData = usersData?.users.length === 0;

  const declinationUsers = getDeclination({
    one: "клиент",
    few: "клиента",
    many: "клиентов",
    value: usersData?.totalCount,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isUsersLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Typography.Text className={styles.adminUsersTabTitle}>
        В системе - <b>{declinationUsers}</b>
      </Typography.Text>

      <UsersTabTable usersData={usersData?.users ?? []} />

      {!isEmptyUsersData && (
        <Pagination
          className={styles.adminUsersTabPaginationWrapper}
          pageSize={5}
          total={usersData?.totalCount}
          onChange={handlePageChange}
          current={currentPage}
        />
      )}
    </>
  );
};
