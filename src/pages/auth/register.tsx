import RegisterView from "@/components/views/auth/Register";
import React, { Dispatch, SetStateAction } from "react";

export default function RegisterPage({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
}
