import React, { Dispatch, SetStateAction } from "react";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";

type Proptypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

export default function AuthLayout({
  title,
  children,
  link,
  linkText,
}: Proptypes) {
  return (
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <h1 className={styles.auth__form__title}>{title}</h1>

        {children}

        <p className={styles.auth__form__link}>
          {linkText}
          <Link href={link}>here</Link>
        </p>
      </div>
    </div>
  );
}
