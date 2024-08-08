import React from "react";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";

type Proptypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

export default function AuthLayout({
  error,
  title,
  children,
  link,
  linkText,
}: Proptypes) {
  return (
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <h1 className={styles.auth__form__title}>{title}</h1>
        <p className={styles.auth__form__error}>{error}</p>

        {children}

        <p className={styles.auth__form__link}>
          {linkText}
          <Link href={link}>here</Link>
        </p>
      </div>
    </div>
  );
}
