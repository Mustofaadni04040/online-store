import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import React from "react";
import styles from "./Users.module.scss";

type Proptypes = {
  users: any;
};

export default function UsersAdminView({ users }: Proptypes) {
  return (
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
            {users.map((user: any, index: number) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button type="button">Update</Button>
                      <Button type="button">Delete</Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
