import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateUser.module.scss";

type Proptypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

export default function ModalUpdateUser({
  updatedUser,
  setUpdatedUser,
  setUsersData,
  setToaster,
  session,
}: Proptypes) {
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form: any = e.target as HTMLFormElement;

    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateUser(
        updatedUser.id,
        data,
        session.data?.accessToken
      );

      if (result.status === 200) {
        setLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Success update user",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed update user",
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Fullname"
          name="fullname"
          type="fullname"
          placeholder="John Doe"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Jhon@gmail.com"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          placeholder="0898923527"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          name="role"
          label="Role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />

        <Button
          disabled={loading}
          type="submit"
          className={styles.modal__button}
        >
          {loading ? "Loading..." : "Update User"}
        </Button>
      </form>
    </Modal>
  );
}
