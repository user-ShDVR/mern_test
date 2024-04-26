import { useGetUsersQuery } from "../../store/api/users/users-api";
import { Tag, Typography } from "antd";
import { getDeclination } from "../../utils/get-declination";
import styles from "./AdminClientsTab.module.scss";
import { ShadowCard } from "../ShadowCard/ShadowCard";
import { Spinner } from "../Spinner/Spinner";
import { IUser } from "../../types/IUserState";

export const AdminClientsTab = () => {
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: 1,
    limit: 1000,
  });

  const declinationClients = getDeclination({
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
        В системе - <b>{declinationClients}</b>
      </Typography.Text>

      <div className={styles.wrapperClientsCards}>
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
