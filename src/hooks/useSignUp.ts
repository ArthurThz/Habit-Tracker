import { useMutation } from "@tanstack/react-query";

type SignIn = {
  name: string;
  email: string;
  password: string;
};
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (newUser: SignIn) => {
      const response = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("An error occurred during sign up");
      }

      const data = await response.json();
      return data.data;
    },
  });
};
