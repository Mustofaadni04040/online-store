import UsersAdminView from "@/components/views/admin/users";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };

    getAllUsers();
  }, []);

  return (
    <>
      <UsersAdminView users={users} />
    </>
  );
}
