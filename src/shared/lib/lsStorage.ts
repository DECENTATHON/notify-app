import {TTheme} from "@/shared/types";

const storage = <T = string>(key: string) => ({
    _value: null as T | null,
    save(data: T) {
        this._value = data;
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    get() {
        if (this._value) return this._value;
        if (typeof localStorage !== "undefined") {
            try {
                const raw = localStorage.getItem(key);
                if (!raw || raw === "undefined" || raw === "null") {
                    this._value = null;
                    return null;
                }
                this._value = JSON.parse(raw);
                return this._value;
            } catch (e) {
                console.error('Error parsing localStorage key:', key, e);
                this._value = null;
                return null;
            }
        }
        return null;
    },    
    clear() {
        this._value = null;
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(key);
        }
    },
});
export const accessTokenStorage = storage("access");
export const refreshTokenStorage = storage("refresh");
export const userStorage = storage<any>("user");
export const languageStorage = storage<any>("language");
export const themeStorage = storage<any>("theme");
export const onboardingStorage = storage<any>("onboarding");
export const saveTokens = (access: string, refresh: string) => {
    accessTokenStorage.save(access);
    refreshTokenStorage.save(refresh);
};
export const clearTokens = () => {
    accessTokenStorage.clear();
    refreshTokenStorage.clear();
};
export const saveUser = (data: any) => {
    userStorage.save(data);
};
export const clearUser = () => {
    userStorage.clear();
};
export const toggleTheme = (data: TTheme) => {
    themeStorage.save(data);
};
export const saveOnboarding = () => {
    onboardingStorage.save(new Date().toISOString());
};
export const clearOnboarding = () => {
    onboardingStorage.clear();
};
export default storage;
