import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <CartView cart={cart} products={products} />
    </>
  );
}
