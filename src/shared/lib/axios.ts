import axios from "axios";

import {accessTokenStorage, clearTokens, saveTokens} from "./lsStorage";

export const fetcher = axios.create({
    baseURL: "https://34.70.85.174/api",
});

fetcher.interceptors.request.use((config: any) => {
    if (accessTokenStorage.get() && !config.url.includes("refresh") && !config.url.includes("login")) {
        config.headers.Authorization = `Bearer ${accessTokenStorage.get()}`;
    }
    return config;
});
fetcher.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response.status === 401 && !error.config.url.includes("refresh") && !error.config.url.includes("login")) {
            clearTokens();
            window.location.href = "/";
        }
        return Promise.reject(error);
    },
);
