import { fetchResourceApi } from "@/client/base";
import { IServerResponse } from "@/types/server-response";
import NextAuth, { Session, User } from "next-auth";
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
        const serverResponse  = await fetchRes.json() as IServerResponse<User>;
        if(serverResponse.status && serverResponse.code == "200")
            return serverResponse.data;

        throw new Error(serverResponse.message);
      } catch (e: Error | unknown) {
        if (e instanceof Error)
            throw new Error(e.message);
        if (e instanceof String) 
            throw new Error(e as string);
      }
  },
};

export default NextAuth({
    pages:{
        error:"/login",
        signIn:"/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider(credentialsProviderOption),
    ],
    callbacks: {
        async signIn({ user , account, profile, email, credentials }) {
            console.log("signIn ");
            console.log(user);
            return false;
        },
        jwt({ token, user }) {
            console.log("jwt ");
            console.log(user);
            if (user) {
                token.id = (user as Session["user"]).id;
                token.login = (user as Session["user"]).login;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            console.log("", url, baseUrl)
            return process.env.DEFAULT_URL;
        },
        session({ session, token }) {
            console.log("session ");
            session.user = { ...session.user, id: token.id as string, login: token.login as string };
            console.log(session);
            return session;
        },
  },
  logger: {
    error(code, metadata) {
        console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    } 
  }
});
