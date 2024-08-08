import React, { FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        push("/auth/login");
      } else {
        setError("Email or password is already taken");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError("Email or password is already taken");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      link="/auth/login"
      linkText="Have an account? Sign in "
      error={error}
    >
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
    </AuthLayout>
  );
}
