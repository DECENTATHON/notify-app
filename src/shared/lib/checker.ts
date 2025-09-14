export const isNotEmpty = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined && value !== "";
};

export const isBoolean = (value: unknown): value is boolean => {
    return typeof value === "boolean";
};
