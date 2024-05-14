import { useGetAuthUserQuery } from "store/api/auth/auth-api";

export const useGetUser = () => {
  const { data: userData, isLoading: isUserDataLoading } =
    useGetAuthUserQuery();

  const isUserAdmin = userData?.role === "admin";

  return { userData, isUserDataLoading, isUserAdmin };
};
