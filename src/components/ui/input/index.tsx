import React from "react";
import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
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
        required
      />
    </div>
  );
}
