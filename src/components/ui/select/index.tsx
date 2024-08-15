import React from "react";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};

export default function Select({
  name,
  label,
  defaultValue,
  disabled,
  options,
}: Proptypes) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
