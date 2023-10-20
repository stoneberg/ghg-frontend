import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface IAuthProviderProps {}

interface IAuthContext {
    initialized: boolean;
    session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
    const result = useContext(AuthContext);
    if (!result?.initialized) {
        throw new Error("Auth context must be used within a AuthProvider!");
    }
    return result;
}

const publicPageList = ["/login", "/", ""];
const isPublicPage = (pathname: string) => {
    // return publicPageList.includes(pathname);
    return true;
};

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (isPublicPage(router.pathname)) {
       return <>{children}</>; 
    }

    return <AuthContext.Provider value={{ initialized: true, session }}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthProvider);
