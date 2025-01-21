import OrdersMemberView from "@/components/views/member/Orders";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import React, { useEffect, useState } from "react";

export default function OrdersMemberPage() {
  const [profile, setProfile] = useState<User | any>({});
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <OrdersMemberView profile={profile} />
    </>
  );
}
