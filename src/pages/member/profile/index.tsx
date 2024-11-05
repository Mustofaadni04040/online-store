import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function ProfilePage({ setToaster }: Proptypes) {
  return (
    <>
      <ProfileMemberView setToaster={setToaster} />
    </>
  );
}
