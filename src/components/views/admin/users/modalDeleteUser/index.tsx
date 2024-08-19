import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import React from "react";
import styles from "./ModalDeleteUser.module.scss";
import { useSession } from "next-auth/react";

export default function ModalDeleteUser({
  deletedUser,
  setDeletedUser,
  setUsersData,
}: any) {
  const session: any = useSession();

  const handleDeleteUser = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure?</h1>
      <Button
        type="button"
        onClick={() => handleDeleteUser()}
        className={styles.modal__button}
      >
        Delete
      </Button>
    </Modal>
  );
}
