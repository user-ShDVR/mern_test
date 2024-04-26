import { useSelector } from "react-redux";
import { RouterPath } from "../../configs/route-сonfig";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../store/features/userSlice";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth(props: RequireAuthProps) {
  const { children } = props;

  const { user } = useSelector(selectUser);

  const isUserAdmin = user?.role === "admin";
  const isAdminPanelPage = window.location.pathname === RouterPath.admin_panel;

  // if (!user) {
  //   return <Navigate to={RouterPath.main} />;
  // }

  // if (!isUserAdmin && isAdminPanelPage) {
  //   return <Navigate to={RouterPath.forbidden} />;
  // }

  return children;
}
