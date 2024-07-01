import { useGetAuthUserQuery } from "store/api/auth/auth-api";

export const useGetAuthUser = () => {
  const { data: authUserData, isLoading: isUserDataLoading } =
    useGetAuthUserQuery();

  const isUserAdmin = authUserData?.role === "admin";

  return { authUserData, isUserDataLoading, isUserAdmin };
};
