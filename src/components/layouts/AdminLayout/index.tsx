import Sidebar from "@/components/fragments/Sidebar";
import React from "react";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bx bxs-group",
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: "bxs-cart",
  },
];
export default function AdminLayout({ children }: Proptypes) {
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
}
