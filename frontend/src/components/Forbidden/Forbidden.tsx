import { Button, Typography } from "antd";
import styles from "./Forbidden.module.scss";
import { Link } from "react-router-dom";
import { RouterPath } from "../../configs/route-сonfig";

export const Forbidden = () => {
  return (
    <div className={styles.wrapper}>
      <Typography.Title>
        Недостаточно прав для просмотра страницы
      </Typography.Title>

      <Link className={styles.backButton} to={RouterPath.main}>
        <Button type="primary" size="large">
          Вернуться на главную страницу
        </Button>
      </Link>
    </div>
  );
};
