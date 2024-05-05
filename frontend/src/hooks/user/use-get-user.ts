import React from "react";

import { useGetAuthUserQuery } from "store/api/auth/auth-api";

import { useActions } from "hooks/general/use-actions";

export const useGetUser = () => {
  const { setUser } = useActions();

  const { data: userData } = useGetAuthUserQuery();

  const isUserAdmin = userData?.role === "admin";

  React.useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [setUser, userData]);

  return { userData, isUserAdmin };
};
