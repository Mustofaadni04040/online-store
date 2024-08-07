import React, { FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RegisterView() {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target as HTMLFormElement;

    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      setError("Email or password is already taken");
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__form}>
        <h1 className={styles.register__form__title}>Create an account</h1>
        <p className={styles.register__form__error}>{error}</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className={styles.register__form__item__input}
              placeholder="jhoen doe"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={styles.register__form__item__input}
              placeholder="jhoen@gmail.com"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
              className={styles.register__form__item__input}
              placeholder="0898923527"
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={styles.register__form__item__input}
              placeholder="**************"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.register__form__button}
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className={styles.register__form__link}>
          Have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </div>
  );
}
