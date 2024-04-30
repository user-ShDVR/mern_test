import { Tag, Typography } from "antd";

import styles from "components/AdminPanel/AdminPanelTab.module.scss";
import { ShadowCard } from "components/ShadowCard/ShadowCard";
import { Spinner } from "components/Spinner/Spinner";

import { useGetUsersQuery } from "store/api/users/users-api";

import {
  DEFAULT_USERS_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_USERS_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "constants/users-constants";

import { getDeclination } from "utils/get-declination";

import { IUser } from "types/IUser";

export const AdminUsersTab = () => {
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: DEFAULT_USERS_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
    limit: DEFAULT_USERS_LIMIT_IN_ADMIN_PANEL_PAGE,
  });

  const declinationUsers = getDeclination({
    one: "клиент",
    few: "клиента",
    many: "клиентов",
    value: usersData?.totalCount,
  });

  if (isUsersLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography.Text className={styles.countTitle}>
        В системе - <b>{declinationUsers}</b>
      </Typography.Text>

      <div className={styles.entityWrapperCards}>
        {usersData?.users.map((user: IUser) => (
          <ShadowCard key={user.id}>
            <p>
              Идентификатор: <Tag>{user.id}</Tag>
            </p>

            <p className={styles.entityField}>
              Имя: <Tag>{user.name}</Tag>
            </p>

            <p className={styles.entityField}>
              Фамилия: <Tag>{user.surname}</Tag>
            </p>

            <p className={styles.entityField}>
              Отчество: <Tag>{user.lastname}</Tag>
            </p>

            <p className={styles.entityField}>
              E-mail: <Tag>{user.email}</Tag>
            </p>

            <p className={styles.entityField}>
              Роль: <Tag>{user.role}</Tag>
            </p>
          </ShadowCard>
        ))}
      </div>
    </>
  );
};
