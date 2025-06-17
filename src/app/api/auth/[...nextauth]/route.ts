import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { dbConnection } from "@/lib/neon";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const result =
          await dbConnection`SELECT id, name, email, password FROM users WHERE email = ${credentials.email}`;

        const user = result[0];

        if (!user) {
          return null;
        }

        const passwordOk = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordOk) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // agora você vê o erro como query param
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
