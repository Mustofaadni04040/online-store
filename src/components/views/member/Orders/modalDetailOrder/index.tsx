import Modal from "@/components/ui/modal";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import styles from "./ModalDetailOrder.module.scss";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import Image from "next/image";

type Proptypes = {
  setDetailOrder: Dispatch<SetStateAction<{}>>;
  detailOrder: any;
  products: Product[];
};

export default function ModalDetailOrder({
  setDetailOrder,
  detailOrder,
  products,
}: Proptypes) {
  console.log(products);

  const getProduct = (id: string) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  return (
    <Modal onClose={() => setDetailOrder({})}>
      <h2 className={styles.modal__subtitle}>Data Order</h2>
      <div className={styles.modal__data}>
        <div className={styles.modal__data__item}>
          <h4>Order ID</h4>
          <p>{detailOrder?.orderId}</p>
        </div>
        <div className={styles.modal__data__item}>
          <h4>Total</h4>
          <p>{convertIDR(detailOrder?.total)}</p>
        </div>
        <div className={styles.modal__data__item}>
          <h4>Status</h4>
          <p>
            {detailOrder?.status === "pending"
              ? "Payment Pending"
              : detailOrder?.status === "settlement"
              ? "Payment Received"
              : "Payment Failed"}
          </p>
        </div>
      </div>
      <h2 className={styles.modal__subtitle}>Data Recipient</h2>
      <div className={styles.modal__data}>
        <div className={styles.modal__data__item}>
          <h4>Name</h4>
          <p>{detailOrder?.address?.recipient}</p>
        </div>
        <div className={styles.modal__data__item}>
          <h4>Phone</h4>
          <p>{detailOrder?.address?.phone}</p>
        </div>
        <div className={styles.modal__data__item}>
          <h4>Address</h4>
          <p>{detailOrder?.address?.addressLine}</p>
        </div>
        <div className={styles.modal__data__item}>
          <h4>Notes</h4>
          <p>{detailOrder?.address?.note}</p>
        </div>
      </div>
      <h2 className={styles.modal__subtitle}>Data Product</h2>
      {detailOrder?.items?.map(
        (item: { id: string; size: string; qty: number }, index: number) => (
          <Fragment key={index}>
            <div className={styles.modal__product}>
              {getProduct(item.id)?.image && (
                <div className={styles.modal__product__image}>
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    alt={`${item.id}-${item.size}`}
                    placeholder="blur"
                    blurDataURL={`${getProduct(item.id)?.image}`}
                    width={100}
                    height={100}
                    className={styles.modal__product__main__list}
                  />
                </div>
              )}
              <div className={styles.modal__product__info}>
                <h4 className={styles.modal__product__info__title}>
                  {getProduct(item.id)?.name}
                </h4>
                <div className={styles.modal__product__info__data}>
                  <label className={styles.modal__product__info__data__size}>
                    Size {item.size}
                  </label>
                  <span>|</span>
                  <label className={styles.modal__product__info__data__qty}>
                    Quantity {item.qty}
                  </label>
                </div>

                <h4 className={styles.modal__product__info__price}>
                  {convertIDR(getProduct(item.id)?.price)}
                </h4>
              </div>
            </div>
          </Fragment>
        )
      )}
    </Modal>
  );
}
