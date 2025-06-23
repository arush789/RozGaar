import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:3001/get-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
          }),
        });

        const user = await response.json();
        console.log({ user });
        const isValidPassword = await compare(
          credentials?.password || "",
          user.password
        );

        console.log(isValidPassword);

        if (isValidPassword) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
