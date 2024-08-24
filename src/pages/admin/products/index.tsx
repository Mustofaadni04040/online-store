import ProductsAdminView from "@/components/views/admin/products";
import productServices from "@/services/product";
import React, { useEffect, useState } from "react";

export default function AdminProductsPage({ setToaster }: any) {
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
      <ProductsAdminView products={products} setToaster={setToaster} />
    </>
  );
}
