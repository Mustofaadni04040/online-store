import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ModalDeleteUser.module.scss";
import { User } from "@/types/user.type";

type Proptypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function ModalDeleteUser({
  deletedUser,
  setDeletedUser,
  setUsersData,
  setToaster,
}: Proptypes) {
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);

    try {
      const result = await userServices.deleteUser(deletedUser.id);
      if (result.status === 200) {
        setLoading(false);
        setDeletedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Success delete user",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed delete user",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure?</h1>
      <Button
        type="button"
        onClick={() => handleDeleteUser()}
        className={styles.modal__button}
        disabled={loading}
      >
        {loading ? "Loading..." : "Yes, delete"}
      </Button>
    </Modal>
  );
}
