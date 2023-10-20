import { fetchResourceApi } from "@/client/base";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";

const credentialsProviderOption: CredentialsConfig<{}> = {
  type: "credentials",
  id: "login-credentials",
  name: "login-credentials",
  credentials: {
    username: { label: "username", type: "text" },
    password: { label: "password", type: "password" },
  },
  async authorize(credentials: Record<string, unknown> | undefined) {
      try {
        const fetchRes = await fetchResourceApi.commomApi.post("api/common/v1/auth/signin", {
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
        });
        return fetchRes.json();
      } catch (e) {
        console.log(e);
        return null;
      }
  },
};

export default NextAuth({
  pages: {
    signIn: "/api/common/v1/auth/signin",
    verifyRequest: "/login?verify=1",
    error: '/auth/error',
  },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
    CredentialsProvider(credentialsProviderOption),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn ");
      return true;
    },
    jwt({ token, user }) {
       console.log("jwt ");
      if (user) {
        token.id = (user as Session["user"]).id;
        token.login = (user as Session["user"]).login;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect!!!!!!1", baseUrl);
      console.log("redirect!!!!!!2", url);
      return process.env.DEFAULT_URL;
    },
    session({ session, token }) {
       console.log("vsession ");
      session.user = { ...session.user, id: token.id as string, login: token.login as string };
      return session;
    },
  },
});
