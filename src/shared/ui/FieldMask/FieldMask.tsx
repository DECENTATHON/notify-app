import React, {ComponentProps, useId} from "react";
import {InputMask} from "@react-input/mask";

import {classNames} from "@/shared/lib/classNames";
import {isNotEmpty} from "@/shared/lib/checker";
import css from "./FieldMask.module.scss";

interface FiledMaskProps extends ComponentProps<"input"> {
  label?: string;
  mask: string;
  replacement: Record<any, any>;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  error?: boolean;
  readOnly?: boolean;
  activeLabel?: boolean;
}

const FieldMask: React.FC<FiledMaskProps> = ({
  label,
  mask,
  replacement,
  placeholder,
  className,
  classNameLabel,
  error,
  value,
  activeLabel,
  readOnly,
  onChange,
}) => {
  const id = useId();
  return (
    <>
      <div className={css.FieldMaskWrap}>
        <InputMask
          id={id}
          mask={mask}
          replacement={replacement || {_: /\d/}}
          placeholder={placeholder}
          className={classNames(css.FieldMask, className || "", {
            [css.FieldMaskError]: error,
            "!border-primary": !!value,
            "!bg-gray-200": readOnly,
          })}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
        {label ? (
          <label htmlFor={id} className={classNames(css.Label, {[css.ActiveInput]: isNotEmpty(value) || activeLabel}, classNameLabel || "")}>
            {label}
          </label>
        ) : null}
      </div>
    </>
  );
};

export default FieldMask;
