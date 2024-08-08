import React, { FormEvent, useState } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function LoginView() {
  const { push, query } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setLoading(false);
      setError("Email or password is incorrect");
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <h1 className={styles.login__form__title}>Sign in to your account</h1>
        <p className={styles.login__form__error}>{error}</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Jhon@gmail.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="**************"
          />
          <Button type="submit" disabled={loading} variant="primary">
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <Button
          type="button"
          className={styles.login__form__google}
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          variant="google"
        >
          <img
            src="/google-icon.png"
            alt="google-icon"
            width={25}
            height={25}
          />
          Login with Google
        </Button>
        <p className={styles.login__form__link}>
          Don&apos;t have an account? Sign up{" "}
          <Link href="/auth/register">here</Link>
        </p>
      </div>
    </div>
  );
}
