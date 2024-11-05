import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";
import Image from "next/image";

export default function LoginView({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setToaster({
          variant: "success",
          message: "Login success",
        });
      } else {
        setLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or password is incorrect",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Something went wrong",
      });
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      link="/auth/register"
      linkText="Don't have an account? Sign up "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Jhon@gmail.com"
          classname={styles.input}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          classname={styles.input}
        />
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className={styles.button}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <Button
        type="button"
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
        variant="google"
        className={styles.button}
      >
        <Image
          src="/google-icon.png"
          alt="google-icon"
          width={25}
          height={25}
        />
        Login with Google
      </Button>
    </AuthLayout>
  );
}
