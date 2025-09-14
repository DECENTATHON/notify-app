import axios from "axios";

import {accessTokenStorage, clearTokens, saveTokens} from "./lsStorage";

export const fetcher = axios.create({
    baseURL: "http://10.241.172.111:8000",
});