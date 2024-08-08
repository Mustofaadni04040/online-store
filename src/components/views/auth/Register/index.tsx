import React, { FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

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
          <Input
            label="Fullname"
            name="fullname"
            type="fullname"
            placeholder="John Doe"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Jhon@gmail.com"
          />
          <Input
            label="Phone"
            name="phone"
            type="number"
            placeholder="0898923527"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="**************"
          />

          <Button type="submit" disabled={loading} variant="primary">
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
        <p className={styles.register__form__link}>
          Have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </div>
  );
}
