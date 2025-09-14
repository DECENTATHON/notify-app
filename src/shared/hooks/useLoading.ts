import {useEffect, useState} from "react";

export const useLoading = (delay = 500) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, delay);
    }, [delay]);
    return {
        isLoading,
        setLoading,
    };
};
