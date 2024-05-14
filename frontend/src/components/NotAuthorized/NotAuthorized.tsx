import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import styles from "./NotAuthorized.module.scss";

export const NotAuthorized = () => {
  return (
    <div className={styles.notAuthorizedWrapper}>
      <Typography.Title className={styles.notAuthorizedTitle} level={3}>
        Вы не авторизованы.
        <br />
        Пожалуйста, пройдите авторизацию, нажав на кнопку "Вход" в правом
        верхнем углу экрана.
        <br />
        Или вернитесь на главную страницу.
      </Typography.Title>

      <Link className={styles.backToMainPageButton} to={RouterPath.main}>
        <Button type="primary" size="large">
          Вернуться на главную страницу
        </Button>
      </Link>
    </div>
  );
};
