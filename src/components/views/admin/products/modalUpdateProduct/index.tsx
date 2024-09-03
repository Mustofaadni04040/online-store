import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/inputFile";
import productServices from "@/services/product";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";

type Proptypes = {
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  updatedProduct: Product | any;
};

export default function ModalUpdateProduct({
  setUpdatedProduct,
  updatedProduct,
  setToaster,
  setProductsData,
}: Proptypes) {
  const [loading, setLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  console.log(updatedProduct);

  const handleStock = (e: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success update product",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form: any = e.target as HTMLFormElement;

    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed upload image",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert product price"
          defaultValue={updatedProduct.price}
        />
        <Select
          name="category"
          label="Category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct.category}
        />
        <Select
          name="status"
          label="Status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />

        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt={updatedProduct.name}
            className={styles.form__image__preview}
          />

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>

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
                  defaultValue={item.size}
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
                  defaultValue={item.qty}
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

        <Button
          disabled={loading}
          type="submit"
          className={styles.form__submit}
        >
          {loading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
}
