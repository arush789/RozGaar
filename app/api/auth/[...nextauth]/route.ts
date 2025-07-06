import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcrypt";
import axios from "axios";

declare module "next-auth" {
  interface Session {
    user: {
      id: number | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

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
        username: { label: "Username", type: "text" },
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

        const isValidPassword = await compare(
          credentials?.password || "",
          user.password
        );

        if (isValidPassword) {
          return {
            id: user.id,
            email: user.email,
            name: user.username,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { data: userInfo } = await axios.post(
          "http://localhost:3001/get-user",
          {
            email: user.email,
          }
        );

        if (!userInfo || (Array.isArray(userInfo) && userInfo.length === 0)) {
          await axios.post("http://localhost:3001/create-user", {
            username: user.name,
            email: user.email,
            password: "google-auth",
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ user, token }) {
      if (user) {
        try {
          const { data: userInfo } = await axios.post(
            "http://localhost:3001/get-user",
            {
              email: user.email ?? token.email,
            }
          );

          token.id = userInfo?.id;
          token.role = userInfo?.role;
          token.email = userInfo?.email;
        } catch (error) {
          console.error("Error in jwt callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.id = token.id as number;
        session.user.role = token.role as string; // ✅ add this line
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
