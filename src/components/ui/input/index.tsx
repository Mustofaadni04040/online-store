import React from "react";
import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  classname?: string;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
  onChange,
  classname,
}: Proptypes) {
  return (
    <div className={`${styles.container} ${classname}`}>
      {label && (
        <label htmlFor={name} className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        className={styles.container__input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        required
      />
    </div>
  );
}
