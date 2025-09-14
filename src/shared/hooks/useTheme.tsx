import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";

import {themeStorage} from "@/shared/lib/lsStorage";
import {TTheme} from "@/shared/types";

interface IContext {
    theme: TTheme | undefined;
    setTheme?: (data: TTheme) => void;
}

const initialState: IContext = {
    theme: undefined,
};
const context = createContext<IContext>(initialState);
const {Provider} = context;
export const useTheme = () => useContext(context);

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, setState] = useState({
        theme: undefined,
    });
    const setTheme = (data: TTheme) => {
        themeStorage.save(data);
        setState((prev: any) => {
            return {
                ...prev,
                theme: data,
            };
        });
    };
    const value = useMemo(() => {
        return {
            ...state,
            setTheme,
        };
    }, [state]);
    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            setTheme(themeStorage.get() || "light");
        }
    }, []);
    return <Provider value={value}>{children}</Provider>;
};
