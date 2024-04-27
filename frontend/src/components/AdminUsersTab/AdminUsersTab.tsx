import { useGetUsersQuery } from "../../store/api/users/users-api";
import { Tag, Typography } from "antd";
import { getDeclination } from "../../utils/get-declination";
import styles from "./AdminUsersTab.module.scss";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { Spinner } from "../Spinner/Spinner";
import { IUser } from "../../types/IUserState";
import {
  DEFAULT_USERS_CURRENT_PAGE_NUMBER_IN_ADMIN_PANEL,
  DEFAULT_USERS_LIMIT_IN_ADMIN_PANEL_PAGE,
} from "../../constants/users-constants";

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

      <div className={styles.wrapperUsersCards}>
        {usersData?.users.map((user: IUser) => (
          <ShadowCard key={user.id}>
            <p>
              Идентификатор: <Tag>{user.id}</Tag>
            </p>

            <p className={styles.clientField}>
              Имя: <Tag>{user.name}</Tag>
            </p>

            <p className={styles.clientField}>
              Фамилия: <Tag>{user.surname}</Tag>
            </p>

            <p className={styles.clientField}>
              Отчество: <Tag>{user.lastname}</Tag>
            </p>

            <p className={styles.clientField}>
              E-mail: <Tag>{user.email}</Tag>
            </p>

            <p className={styles.clientField}>
              Роль: <Tag>{user.role}</Tag>
            </p>
          </ShadowCard>
        ))}
      </div>
    </>
  );
};
