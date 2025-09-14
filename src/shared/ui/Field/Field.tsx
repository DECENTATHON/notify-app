import React, {useId} from "react";
import {Input, InputNumber, InputProps} from "antd";

import {classNames} from "@/shared/lib/classNames";
import {isNotEmpty} from "@/shared/lib/checker";
import css from "./Field.module.scss";

interface FieldProps extends InputProps {
    label?: string;
    inputType?: "password" | "number" | "text";
    placeholder?: string;
    className?: string;
    classNameLabel?: string;
    value?: any;
    min?: number;
    max?: number;
}

const Field: React.FC<FieldProps> = ({label, inputType = "text", placeholder, className, classNameLabel, value, prefix, min, max, ...props}) => {
    const id = useId();
    const inputNumberProps: any = props;
    if (inputType === "password") {
        return (
            <>
                <div className={css.FieldWrap}>
                    <Input.Password
                        {...props}
                        id={id}
                        placeholder={placeholder}
                        className={classNames(css.Field, className || "", {
                            "border-primary": !!value,
                        })}
                    />
                    {label ? (
                        <label htmlFor={id} className={classNames(css.Label, {[css.ActiveInput]: isNotEmpty(value)}, classNameLabel || "")}>
                            {label}
                        </label>
                    ) : null}
                </div>
            </>
        );
    }
    if (inputType === "number") {
        return (
            <>
                <div className={css.FieldWrap}>
                    <InputNumber
                        {...inputNumberProps}
                        type={"number"}
                        id={id}
                        min={min}
                        max={max}
                        placeholder={placeholder}
                        prefix={prefix}
                        value={value}
                        className={classNames(css.Field, className || "", {
                            "border-primary": !!value || value === 0,
                        })}
                    />
                    {label ? (
                        <label htmlFor={id} className={classNames(css.Label, {[css.ActiveInput]: isNotEmpty(value)}, classNameLabel || "")}>
                            {label}
                        </label>
                    ) : null}
                </div>
            </>
        );
    }
    return (
        <>
            <div className={css.FieldWrap}>
                <Input
                    {...props}
                    id={id}
                    placeholder={placeholder}
                    prefix={prefix}
                    value={value}
                    className={classNames(css.Field, className || "", {
                        "border-primary": !!value,
                    })}
                />
                {label ? (
                    <label htmlFor={id} className={classNames(css.Label, {[css.ActiveInput]: isNotEmpty(value)}, classNameLabel || "")}>
                        {label}
                    </label>
                ) : null}
            </div>
        </>
    );
};

export default Field;
