import React, { useContext, useState } from "react";
import styles from "./DetailProduct.module.scss";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
  setCart: any;
};

export default function DetailProductView({
  product,
  cart,
  productId,
  setCart,
}: PropTypes) {
  const { status }: any = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const { setToaster } = useContext(ToasterContext);
  console.log(cart);

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            qty: 1,
            size: selectedSize,
          },
        ];
      }
      try {
        setCart(newCart);
        const result = await userServices.addToCart({
          carts: newCart,
        });

        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success add to cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed add to cart",
        });
      }
      console.log(newCart);
    }
  };
  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          {product?.image && (
            <Image
              src={product?.image}
              alt={product?.name}
              width={500}
              height={500}
              className={styles.detail__main__left__image}
              priority
            />
          )}
        </div>
        <div className={styles.detail__main__right}>
          <h1 className={styles.detail__main__right__name}>{product?.name}</h1>
          <h3 className={styles.detail__main__right__category}>
            {product?.category}
          </h3>
          <h3 className={styles.detail__main__right__price}>
            {convertIDR(product?.price)}
          </h3>
          <p className={styles.detail__main__right__description}>
            {product?.description}
          </p>
          <p className={styles.detail__main__right__subtitle}>Select Size</p>
          <div className={styles.detail__main__right__size}>
            {product?.stock?.map(
              (item: { size: string; qty: number }, index: number) => (
                <div
                  className={styles.detail__main__right__size__item}
                  key={index}
                >
                  <input
                    className={styles.detail__main__right__size__item__input}
                    type="radio"
                    id={`size-${item.size}`}
                    name="size"
                    disabled={item.qty <= 0}
                    onClick={() => setSelectedSize(item.size)}
                    checked={selectedSize === item.size}
                    onChange={() => {}}
                  />
                  <label
                    className={styles.detail__main__right__size__item__label}
                    htmlFor={`size-${item.size}`}
                  >
                    {item.size}
                  </label>
                </div>
              )
            )}
          </div>
          <Button
            className={styles.detail__main__right__add}
            type={status === "authenticated" ? "submit" : "button"}
            onClick={() => {
              status === "unauthenticated"
                ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                : handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
