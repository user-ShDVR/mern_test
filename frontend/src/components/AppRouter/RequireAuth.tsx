import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useGetUser } from "hooks/user/use-get-user";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth(props: RequireAuthProps) {
  const { children } = props;

  const { isUserAdmin } = useGetUser();

  const isAdminPanelPage = window.location.pathname === RouterPath.admin_panel;

  // if (!user) {
  //   return <Navigate to={RouterPath.main} />;
  // }

  // if (!isUserAdmin && isAdminPanelPage) {
  //   return <Navigate to={RouterPath.forbidden} />;
  // }

  return children;
}
