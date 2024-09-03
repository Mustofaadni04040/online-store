import React from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type Proptypes = {
  product: Product;
};

export default function Card({ product }: Proptypes) {
  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className={styles.card__image}
      />
      <h4 className={styles.card__title}>{product.name}</h4>
      <p className={styles.card__category}>{product.category}</p>
      <p className={styles.card__price}>{convertIDR(product.price)}</p>
    </div>
  );
}
