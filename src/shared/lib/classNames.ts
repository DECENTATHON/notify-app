type Mode = Record<string, boolean | undefined>;
type Cls = string | undefined;

export function classNames(...res: Array<Mode | Cls | Cls[]>): string {
    return res
        .reduce<string[]>((prev, currentValue) => {
            if (Array.isArray(currentValue)) {
                prev.push(...(currentValue.filter((el) => !!el) as string[]));
            } else if (typeof currentValue === "string" && currentValue) {
                prev.push(currentValue);
            } else if (typeof currentValue === "object") {
                const validCLs = Object.keys(currentValue).filter((clsKey) => !!currentValue[clsKey]);
                prev.push(validCLs.join(" "));
            }
            return prev;
        }, [])
        .join(" ");
}
