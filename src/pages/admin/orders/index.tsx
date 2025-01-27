import OrdersAdminView from "@/components/views/admin/Orders";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import React, { useEffect, useState } from "react";

export default function OrdersAdminPage() {
  return (
    <>
      <OrdersAdminView />
    </>
  );
}
