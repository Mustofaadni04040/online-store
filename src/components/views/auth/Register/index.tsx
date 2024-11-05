import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function RegisterView({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;

    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register success, please login",
        });
        setLoading(false);
      } else {
        setToaster({
          variant: "danger",
          message: "something went wrong",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Email or password is already taken",
      });
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      link="/auth/login"
      linkText="Have an account? Sign in "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Fullname"
          name="fullname"
          type="fullname"
          placeholder="John Doe"
          classname={styles.input}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Jhon@gmail.com"
          classname={styles.input}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          placeholder="0898923527"
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
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
}
