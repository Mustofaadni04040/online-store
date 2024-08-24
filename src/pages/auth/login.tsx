import LoginView from "@/components/views/auth/login";
import React, { Dispatch, SetStateAction } from "react";

export default function LoginPage({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
}
