import CartView from "@/components/views/cart";
import Head from "next/head";
import React from "react";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <CartView />
    </>
  );
}
