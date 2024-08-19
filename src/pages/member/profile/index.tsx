import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
    };

    getAllUsers();
  }, [session]);

  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
}
