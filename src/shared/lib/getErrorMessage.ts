import {AxiosError} from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError && error) {
        return error.response?.data?.message || "Неизвестная ошибка";
    }
    return "Неизвестная ошибка";
};
