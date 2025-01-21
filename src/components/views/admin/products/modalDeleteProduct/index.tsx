import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "./ModalDeleteProduct.module.scss";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

export default function ModalDeleteProduct({
  deletedProduct,
  setDeletedProduct,
  setProductsData,
}: Proptypes) {
  const [loading, setLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);

  const handleDeleteProduct = async () => {
    setLoading(true);

    try {
      const result = await productServices.deleteProduct(deletedProduct.id);
      if (result.status === 200) {
        setLoading(false);
        deleteFile(
          `/images/products/${deletedProduct.id}/${
            deletedProduct.image.split("%2F")[3].split("?")[0]
          }`,
          async (status: boolean) => {
            if (status) {
              setDeletedProduct({});
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success delete product",
              });
            }
          }
        );
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed delete product",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.modal__title}>Are you sure?</h1>
      <Button
        type="button"
        onClick={() => handleDeleteProduct()}
        className={styles.modal__button}
        disabled={loading}
      >
        {loading ? "Loading..." : "Yes, delete"}
      </Button>
    </Modal>
  );
}
