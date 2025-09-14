import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";

import {clearTokens, clearUser} from "@/shared/lib/lsStorage";

interface IAuthContext {
    isAuth: boolean;
    user: any;
    setUser?: (data: any) => void;
    onLogout?: () => void;
}

const initialState = {
    isAuth: false,
    user: null,
};
const AuthContext = createContext<IAuthContext>(initialState);
const {Provider} = AuthContext;
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [state, setState] = useState({
        isAuth: false,
        user: null,
    });
    const setUser = (data: any) => {
        setState((prev) => {
            return {
                ...prev,
                isAuth: data?.isAuth,
                user: data?.user,
            };
        });
    };
    const onLogout = () => {
        clearTokens();
        clearUser();
        setState((prev) => ({
            ...initialState,
        }));
    };
    const value = useMemo(() => {
        return {
            onLogout,
            setUser,
            ...state,
        };
    }, [state]);
    useEffect(() => {
        setIsClient(true);
        if (typeof localStorage !== "undefined") {
            if (localStorage.getItem("access") && localStorage.getItem("user")) {
                setUser({
                    isAuth: !!JSON.parse(localStorage.getItem("access") || ""),
                });
            }
        }
    }, [router]);
    if (!isClient) {
        return null;
    }
    return <Provider value={value}>{children}</Provider>;
};
