import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Toaster.module.scss";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const ToasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    icon: "bx-x-circle",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    icon: "bx-error",
    color: "#f8e3a2",
    barColor: "#e9d949",
  },
};

export default function Toaster() {
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.14);
    }, 1);
  };

  useEffect(() => {
    timerStart();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (lengthBar < 0) {
      setToaster({});
    }
  }, [lengthBar, setToaster]);

  return (
    <div
      className={`${styles.toaster} ${styles[`toaster--${toaster.variant}`]}`}
    >
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i className={`bx ${ToasterVariant[`${toaster.variant}`].icon}`} />
        </div>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {ToasterVariant[`${toaster.variant}`].title}
          </p>
          <p className={styles.toaster__main__text__description}>
            {toaster.message}
          </p>
        </div>
        <i
          className={`bx bx-x ${styles.toaster__main__close}`}
          onClick={() => setToaster({})}
        />
      </div>
      <div
        className={`${styles.toaster__timer}`}
        style={{ backgroundColor: ToasterVariant[`${toaster.variant}`].color }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: ToasterVariant[`${toaster.variant}`].barColor,
          }}
        />
      </div>
    </div>
  );
}
