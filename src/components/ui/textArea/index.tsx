import React from "react";
import styles from "./TextArea.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  classname?: string;
};

export default function TextArea({
  label,
  name,
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
      <textarea
        name={name}
        id={name}
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
