import { useGetAuthUserQuery } from "store/api/auth/auth-api";

export const useGetUser = () => {
  const { data: userData } = useGetAuthUserQuery();
  const isUserAdmin = userData?.role === "admin";
  return { userData, isUserAdmin };
};
