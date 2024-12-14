import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import Link from "next/link";

export default function CartView() {
  const { setToaster } = useContext(ToasterContext);

  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  // allproducts api
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // cart api
  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((item) => item.id === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    const data = options?.filter((option) => option !== undefined);
    return data;
  };

  const getTotalPrice = () => {
    const totalCart = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return acc + product?.price * item.qty;
      },
      0
    );
    return totalCart;
  };

  const handleDeleteCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });

    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });

      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Success delete item from cart",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed delete item from cart",
      });
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__main}>
        <h1 className={styles.cart__main__title}>Bag</h1>
        <div className={styles.cart__main__list}>
          {cart.length === 0 ? (
            <p className={styles.cart__main__list__empty}>
              You don&apos;t have any items in your bag
            </p>
          ) : (
            cart.map(
              (
                item: { id: string; size: string; qty: number },
                index: number
              ) => (
                <Fragment key={index}>
                  <div className={styles.cart__main__list__item}>
                    {getProduct(item.id)?.image && (
                      <div className={styles.cart__main__list__item__image}>
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          alt={`${item.id}-${item.size}`}
                          placeholder="blur"
                          blurDataURL={`${getProduct(item.id)?.image}`}
                          width={150}
                          height={150}
                          className={styles.cart__main__list__item__image__img}
                        />
                      </div>
                    )}
                    <div className={styles.cart__main__list__item__info}>
                      <h4
                        className={styles.cart__main__list__item__info__title}
                      >
                        {getProduct(item.id)?.name}
                      </h4>
                      <p
                        className={
                          styles.cart__main__list__item__info__category
                        }
                      >
                        {getProduct(item.id)?.category}
                      </p>
                      <div
                        className={styles.cart__main__list__item__info__data}
                      >
                        <label
                          className={
                            styles.cart__main__list__item__info__data__size
                          }
                        >
                          Size
                          <Select
                            key={item.id + item.size}
                            name="size"
                            options={getOptionsSize(item.id, item.size)}
                            defaultValue={item.size}
                            disabled
                          />
                        </label>
                        <label
                          className={
                            styles.cart__main__list__item__info__data__qty
                          }
                        >
                          Quantity
                          <Input
                            key={item.id + item.qty}
                            name="qty"
                            type="number"
                            defaultValue={item.qty}
                            classname={
                              styles.cart__main__list__item__info__data__qty__input
                            }
                            disabled
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteCart(item.id, item.size)}
                          className={
                            styles.cart__main__list__item__info__data__delete
                          }
                        >
                          <i className="bx bx-trash" />
                        </button>
                      </div>
                    </div>
                    <h4 className={styles.cart__main__list__item__price}>
                      {convertIDR(getProduct(item.id)?.price)}
                    </h4>
                  </div>
                  <hr className={styles.cart__main__list__divider} />
                </Fragment>
              )
            )
          )}
        </div>
      </div>
      <div className={styles.cart__summary}>
        <h1 className={styles.cart__summary__title}>Summary</h1>
        <div className={styles.cart__summary__item}>
          <h4>Subtotal</h4>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Delivery</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Task</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <hr className={styles.cart__main__list__divider} />
        <div className={styles.cart__summary__item}>
          <h4>Total</h4>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <hr className={styles.cart__main__list__divider} />
        <Button type="button" className={styles.cart__summary__checkout}>
          <Link href={"/checkout"}>Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
