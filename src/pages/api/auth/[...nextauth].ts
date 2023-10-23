import { fetchResourceApi } from "@/client/base";
import { AccountRole, COMMON_YN } from "@/enums/common";
import { IServerResponse } from "@/types/server-response";
import NextAuth, { ILoginUser, Session, User } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";


const getDummyData = ():ILoginUser => {
  return  {
            userId: "test",
            userName: "테스트", 
            userDisplayName: "테스트",
            userDisplayNameEng: "TEST",
            userEmail: "cs@centero.kr", 
            userTelephone: '0103333333',
            roleId: AccountRole.SystemAdminRole,
            roleName: '',
            /// 로그인 사용자의 타입
            accountType: "",
            // 로그인 사용자의 국가 ID
            countryId: '123',
            /// 로그인 사용자의 국가 명 (KOR)
            countryKorName: 'ko',
            /// 로그인 사용자의 국가 명(ENG)
            countryEngName: 'eng',
            ///로그인 사용자의 설정 타입존
            timeZone: '+09:00',
            /// 로그인 사용자의 계정 활성화 여부
            activateYn: COMMON_YN.Y, 
            /// 로그인 사용자의 계정 결재 여부 
            invoiceYn: COMMON_YN.Y, 
            /// 로그인 사용자 계정 삭제 여부 
            deleteYn: COMMON_YN.Y, 
            /// 사용자 로그인 Main 아이디 입니다.
            mainAccountId: 'test', 
            // 계정 관리 권한입니다.(Y/N)
            accountManagementYn: COMMON_YN.Y 
          };
}

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

        return {
          "id": "leeminuk",
        }

        //throw new Error(serverResponse.message);
      } catch (e: Error | unknown) {
        console.log("catch!!!", e);
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
        signIn:"/login",
        signOut:"/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider(credentialsProviderOption),
    ],
    callbacks: {
        async signIn({ user , account, profile, email, credentials }) {
            console.log("signIn ");
            console.log(user);
            console.log(user);
            return true;
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
            console.log("redirect", url, baseUrl)
             // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        session({ session, token }) {
            console.log("session 1");
      
            session.user = { ...session.user
              , id: token.id as string
              , login: token.login as string 
              , ...getDummyData()
            };
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
