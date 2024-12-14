import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./ModalChangeAddress.module.scss";

type Proptypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};

export default function ModalChangeAddress({
  address,
  setChangeAddress,
  setSelectedAddress,
  selectedAddress,
}: Proptypes) {
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Change Shipping Address</h1>
      {address?.map((item: any, id: number) => (
        <div
          className={`${styles.modal__address} ${
            id === selectedAddress && styles["modal__address--active"]
          }`}
          key={item.addressLine}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          <div className={styles.modal__address__selected}>
            <p>Resipient: {item?.recipient}</p>
            <p>Phone: {item?.phone}</p>
            <p>Address: {item?.addressLine}</p>
            <p>Note: {item?.note}</p>
          </div>
        </div>
      ))}
    </Modal>
  );
}
