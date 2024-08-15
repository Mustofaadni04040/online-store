import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import React from "react";
import styles from "./ModalDeleteUser.module.scss";

export default function ModalDeleteUser({
  deletedUser,
  setDeletedUser,
  setUsersData,
}: any) {
  const handleDeleteUser = async () => {
    userServices.deleteUser(deletedUser.id);
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
