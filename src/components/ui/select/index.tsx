import React from "react";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
  className?: string;
};

export default function Select({
  name,
  label,
  defaultValue,
  disabled,
  options,
  className,
}: Proptypes) {
  return (
    <div className={`${styles.select} ${className}`}>
      <label htmlFor={name} className={styles.select__label}>
        {label}
      </label>
      <div className={styles.select__container}>
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={styles.select__container__input}
        >
          {options?.map((option: Option, index: number) => (
            <option value={option.value} key={index} selected={option.selected}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
