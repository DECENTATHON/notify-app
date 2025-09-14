import {createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState} from "react";

interface IContext {
    preview: any;
    setPreview?: (data: any) => void;
}

const initialState = {
    preview: null,
};
const PreviewContext = createContext<IContext>(initialState);
const {Provider} = PreviewContext;
export const usePreview = () => useContext(PreviewContext);

export const PreviewProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, setState] = useState({
        preview: null,
    });
    const setPreview = useCallback((data: any) => {
        setState({
            preview: data,
        });
    }, []);
    const value = useMemo(() => {
        return {
            ...state,
            setPreview,
        };
    }, [state]);
    return <Provider value={value}>{children}</Provider>;
};
