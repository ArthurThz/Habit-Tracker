import { useSession } from "next-auth/react";

export const useGetUserSession = () => {
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated";

  const isLoading = status === "loading";

  const user = data?.user;

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};
