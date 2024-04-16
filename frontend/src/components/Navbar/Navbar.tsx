import { Button } from "antd";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { RouterPath } from "../AppRouter/routeConfig";
import { logout } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";
import { authApi } from "../../store/api/authApi";
import { usersApi } from "../../store/api/usersApi";

export const Navbar = () => {
  const dispatch = useDispatch();
  // func logout  
  const handleLogout = () => {
    dispatch(authApi.util.resetApiState());
    dispatch(usersApi.util.resetApiState());
    dispatch(logout());
  };
  return (
    <div className={styles.navbar}>
      <Link to={RouterPath.account}>
        <Button>Профиль</Button>
      </Link>

      <Link to={RouterPath.peoples}>
        <Button>Пользователи</Button>
      </Link>

      <Button type="dashed" onClick={handleLogout}>
        Выход
      </Button>
    </div>
  );
};
