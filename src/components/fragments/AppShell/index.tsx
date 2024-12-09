import Toaster from "@/components/ui/Toaster";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disabledNavbar = ["auth", "auth", "admin", "member"];

type PropTypes = {
  children: React.ReactNode;
};

export default function AppShell({ children }: PropTypes) {
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      <div className={lato.className}>
        {!disabledNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
}
