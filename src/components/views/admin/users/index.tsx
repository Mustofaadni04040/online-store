import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import styles from "./Users.module.scss";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";

type Proptypes = {
  users: any;
};

export default function UsersAdminView({ users }: Proptypes) {
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<any>(users);
  const [deletedUser, setDeletedUser] = useState<any>({});

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
              {usersData.map((user: any, index: number) => {
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
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => setDeletedUser(user)}
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
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
}
