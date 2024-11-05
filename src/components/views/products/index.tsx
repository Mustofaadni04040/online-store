import React from "react";
import styles from "./Products.module.scss";
import { Product } from "@/types/product.type";
import Card from "./Card";
import Link from "next/link";

type Proptypes = {
  products: Product[];
};

export default function ProductsView({ products }: Proptypes) {
  return (
    <div className={styles.products}>
      <div className={styles.products__main}>
        <div className={styles.products__main__filter}>
          <div className={styles.products__main__filter__data}>
            <h1 className={styles.products__main__filter__data__title}>
              All Products ({products.length})
            </h1>
            <h4 className={styles.products__main__filter__data__gender}>
              Gender
            </h4>
            <div className={styles.products__main__filter__data__list}>
              <div className={styles.products__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  id="men"
                  className={
                    styles.products__main__filter__data__list__item__checkbox
                  }
                />
                <label
                  className={
                    styles.products__main__filter__data__list__item__label
                  }
                  htmlFor="men"
                >
                  Men
                </label>
              </div>
              <div className={styles.products__main__filter__data__list__item}>
                <input
                  type="checkbox"
                  id="women"
                  className={
                    styles.products__main__filter__data__list__item__checkbox
                  }
                />
                <label
                  className={
                    styles.products__main__filter__data__list__item__label
                  }
                  htmlFor="women"
                >
                  Women
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.products__main__content}>
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
