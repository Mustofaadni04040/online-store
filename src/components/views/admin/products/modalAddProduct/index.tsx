import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/inputFile";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

export default function ModalAddProduct({
  setModalAddProduct,
  setToaster,
  setProductsData,
}: Proptypes) {
  const [loading, setLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = e.target.value;
    setStockCount(newStockCount);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Add Product</h1>
      <form onSubmit={() => {}} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Input label="Price" name="price" type="number" />
        <Select
          name="category"
          label="Category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        />
        <Select
          name="status"
          label="Status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
        />
        <label htmlFor="stock">Stock</label>
        {stockCount.map(
          (item: { size: string; qty: number }, index: number) => (
            <div className={styles.form__stock} key={index}>
              <div className={styles.form__stock__item}>
                <Input
                  label="Size"
                  name="size"
                  type="text"
                  placeholder="Insert product size"
                  onChange={(e) => {
                    handleStock(e, index, "size");
                  }}
                />
              </div>
              <div className={styles.form__stock__item}>
                <Input
                  label="Qty"
                  name="qty"
                  type="number"
                  placeholder="Insert product quantity"
                  onChange={(e) => {
                    handleStock(e, index, "qty");
                  }}
                />
              </div>
            </div>
          )
        )}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add new stock
        </Button>
        <label htmlFor="image">Image</label>
        <InputFile
          name="image"
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />

        <Button
          disabled={loading}
          type="submit"
          className={styles.form__submit}
        >
          {loading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
}
