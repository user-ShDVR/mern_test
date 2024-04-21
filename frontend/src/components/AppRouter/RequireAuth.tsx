import { useSelector } from "react-redux";
import { RouterPath } from "./routeConfig";
import { Navigate } from "react-router-dom";
import { selectUser } from "../../store/features/userSlice";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth(props: RequireAuthProps) {
  const { children } = props;

  const { user } = useSelector(selectUser);

  if (!user) {
    return <Navigate to={RouterPath.main} />;
  }

  return children;
}
