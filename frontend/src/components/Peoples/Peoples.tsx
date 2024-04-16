import { Card, Empty } from "antd";
import { useGetAllUsersQuery } from "../../store/api/usersApi";
import { Page } from "../Page/Page";
import styles from "./PeoplesPage.module.scss";
import { IUser } from "../../store/api/types";
import moment from "moment";

export const Peoples = () => {
  const { data: usersData } = useGetAllUsersQuery(null);

  const calculateAge = (birthDate: Date) => {
    const diff = moment().diff(moment(birthDate), "years");
    return diff;
  };

  return (
    <Page>
      {usersData ? (
        <div className={styles.Peoples}>
          {usersData.map((user: IUser) => (
            <Card className={styles.card} hoverable
            cover={
              <img
                className={styles.img}
                alt=""
                src={user.avatarUrl ||
                  "https://static8.depositphotos.com/1009634/988/v/450/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg"}
              />
            }
            >
              
              <Card.Meta
                title={`Имя: ${user.name}`}
                description={
                  <>
                    <p>Email: {user.email}</p>
                    <p>Возраст: {calculateAge(user.birth_date)}</p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Page>

  );
};
