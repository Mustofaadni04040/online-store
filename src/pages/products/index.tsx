import ProductsView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsView products={products} />
    </>
  );
}
