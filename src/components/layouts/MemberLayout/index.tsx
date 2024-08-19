import Sidebar from "@/components/fragments/Sidebar";
import React from "react";
import styles from "./MemberLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bx bxs-cart-alt",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bx bxs-user",
  },
];
export default function MemberLayout({ children }: Proptypes) {
  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
}
