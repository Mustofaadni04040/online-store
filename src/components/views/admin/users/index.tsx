import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";
import { User } from "@/types/user.type";

type Proptypes = {
  users: User[];
};

export default function UsersAdminView({ users }: Proptypes) {
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>Users Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((user: User, index: number) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className={styles.users__table__action}>
                        <Button
                          type="button"
                          onClick={() => setUpdatedUser(user)}
                          className={styles.users__table__action__button}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => setDeletedUser(user)}
                          className={styles.users__table__action__button}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
}
