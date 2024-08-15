import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import userServices from "@/services/user";
import React, { FormEvent, useState } from "react";

export default function ModalUpdateUser({
  updatedUser,
  setUpdatedUser,
  setUsersData,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form: any = e.target as HTMLFormElement;

    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateUser(updatedUser.id, data);
      console.log(result);

      if (result.status === 200) {
        setLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

        <Button type="submit">Edit User</Button>
      </form>
    </Modal>
  );
}
