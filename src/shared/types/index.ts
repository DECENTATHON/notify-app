import {StaticImageData} from "next/image";
import {ReactNode} from "react";

export type TTheme = "light" | "dark";
export type TValidation = "REQUIRED" | "EMAIL" | "NOT_REPEAT_PASSWORD" | "NOT_VALID_PERIOD"  | "LINK";;
export type TNotification = "news" | "new";
export type TOption = {
    value: any;
    label: string;
};
export type TMenu = {
    image?: StaticImageData;
    node?: ReactNode;
    label: string;
    link?: string;
    className?: string;
    classNameImage?: string;
    classNameText?: string;
    onSelect?: () => void;
};
export type TPersonalData = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: Date | null | undefined;
    sex: string;
    fullname: string;
    city: string;
    address: string;
};
