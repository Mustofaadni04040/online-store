import React, { Dispatch, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type Proptypes = {
  children: React.ReactNode;
  onClose: any;
};

export default function Modal({ children, onClose }: Proptypes) {
  const ref: any = useRef();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  );
}
