import React from "react";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { useGetMeQuery } from "./store/api/authApi";
import { useSelector } from "react-redux";
import { selectUser } from "./store/features/userSlice";
import { Navbar } from "./components/Navbar/Navbar";

export const App = () => {
  const { user } = useSelector(selectUser);
  const { isLoading, isError } = useGetMeQuery(null);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if ((!user && !isLoading) || isError) {
      // Redirect to login page
    }
  }, [user, isLoading, isError]);

  return (
    <>
      {user && token && <Navbar />}
      <AppRouter />
    </>
  );
};
