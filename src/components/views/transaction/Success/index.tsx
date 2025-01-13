import Button from "@/components/ui/button";
import React from "react";
import styles from "./Success.module.scss";
import Image from "next/image";

export default function SuccessView() {
  return (
    <div className={styles.success}>
      <Image
        src={"/success-icon.png"}
        alt="Success Icon"
        width={200}
        height={200}
      />
      <h1>Payment Success</h1>
      <Button type="button" className={styles.success__btn}>
        Check your order here
      </Button>
    </div>
  );
}
