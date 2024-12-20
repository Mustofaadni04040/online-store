import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./modalAddProduct";
import ModalUpdateProduct from "./modalUpdateProduct";
import ModalDeleteProduct from "./modalDeleteProduct";

type Proptypes = {
  products: Product[];
};

export default function ProductsAdminView({ products }: Proptypes) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Products Management</h1>
          <Button
            type="button"
            className={styles.products__add}
            onClick={() => setModalAddProduct(true)}
          >
            <i className="bx bx-plus"></i>Add Product
          </Button>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>

            <tbody>
              {productsData.map((product, index) => (
                <Fragment key={product.id}>
                  <tr>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className={styles.products__table__image}
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          onClick={() => setUpdatedProduct(product)}
                          className={styles.products__table__action__button}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => setDeletedProduct(product)}
                          className={styles.products__table__action__button}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <Fragment key={`${stock.size}-${stock.qty}`}>
                        {index > 0 && (
                          <tr>
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
}
