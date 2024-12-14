import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/button";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import ModalChangeAddress from "./modalChangeAddress";

export default function CheckoutView() {
  const { setToaster } = useContext(ToasterContext);

  const [profile, setProfile] = useState<any>([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  // allproducts api
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // cart api
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);

    data.data.address.filter((address: { isMain: boolean }, index: number) => {
      if (address?.isMain) {
        setSelectedAddress(index);
      }
    });
  };
  console.log(profile);

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const getTotalPrice = () => {
    const totalCart = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return acc + product?.price * item.qty;
      },
      0
    );
    return totalCart;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Shipping Address
            </h3>
            <div className={styles.checkout__main__address__selected}>
              <h4 className={styles.checkout__main__address__selected__title}>
                {profile?.address?.[selectedAddress]?.recipient} -{" "}
                {profile?.address?.[selectedAddress]?.phone}
              </h4>
              <p className={styles.checkout__main__address__selected__address}>
                {profile?.address?.[selectedAddress]?.addressLine}
              </p>
              <p className={styles.checkout__main__address__selected__note}>
                Note: {profile?.address?.[selectedAddress]?.note}
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setChangeAddress(true)}
              >
                Change Address
              </Button>
            </div>
          </div>
          <div className={styles.checkout__main__list}>
            {profile?.carts?.length === 0 ? (
              <p className={styles.checkout__main__list__empty}>
                You don&apos;t have any items in your bag
              </p>
            ) : (
              <>
                <h3>Bag</h3>
                {profile?.carts?.map(
                  (
                    item: { id: string; size: string; qty: number },
                    index: number
                  ) => (
                    <Fragment key={index}>
                      <div className={styles.checkout__main__list__item}>
                        {getProduct(item.id)?.image && (
                          <div
                            className={styles.checkout__main__list__item__image}
                          >
                            <Image
                              src={`${getProduct(item.id)?.image}`}
                              alt={`${item.id}-${item.size}`}
                              placeholder="blur"
                              blurDataURL={`${getProduct(item.id)?.image}`}
                              width={100}
                              height={100}
                              className={
                                styles.checkout__main__list__item__image__img
                              }
                            />
                          </div>
                        )}
                        <div
                          className={styles.checkout__main__list__item__info}
                        >
                          <h4
                            className={
                              styles.checkout__main__list__item__info__title
                            }
                          >
                            {getProduct(item.id)?.name}
                          </h4>
                          <div
                            className={
                              styles.checkout__main__list__item__info__data
                            }
                          >
                            <label
                              className={
                                styles.checkout__main__list__item__info__data__size
                              }
                            >
                              Size {item.size}
                            </label>
                            <span>|</span>
                            <label
                              className={
                                styles.checkout__main__list__item__info__data__qty
                              }
                            >
                              Quantity {item.qty}
                            </label>
                          </div>
                        </div>
                        <h4
                          className={styles.checkout__main__list__item__price}
                        >
                          {convertIDR(getProduct(item.id)?.price)}
                        </h4>
                      </div>
                    </Fragment>
                  )
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}>Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Delivery</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Task</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr className={styles.checkout__main__list__divider} />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <hr className={styles.checkout__main__list__divider} />
          <Button type="button" className={styles.checkout__summary__checkout}>
            Process Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          address={profile?.address}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
    </>
  );
}
