import React from "react";
import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
  onChange,
}: Proptypes) {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
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
