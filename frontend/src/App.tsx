import React from "react";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { useGetMeQuery } from "./store/api/authApi";
import { useSelector } from "react-redux";
import { selectUser } from "./store/features/userSlice";
import { Navbar } from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "./components/AppRouter/routeConfig";

export const App = () => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const { isError } = useGetMeQuery(null);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (!user || isError) {
      navigate(RouterPath.login);
    }
  }, [user, isError]);

  return (
    <>
      {user && token && <Navbar />}
      <AppRouter />
    </>
  );
};
