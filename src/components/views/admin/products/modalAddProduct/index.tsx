import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/inputFile";
import productServices from "@/services/product";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

export default function ModalAddProduct({
  setModalAddProduct,
  setProductsData,
}: Proptypes) {
  const [loading, setLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { setToaster } = useContext(ToasterContext);

  const handleStock = (e: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            // setelah upload image mengupdate data
            const result = await productServices.updateProduct(id, data);
            if (result.status === 200) {
              setLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success add product",
              });
            } else {
              setLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed add product",
              });
            }
          } else {
            setLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed add product",
            });
          }
        }
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const stock = stockCount.map((stock) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const form: any = e.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: "",
    };

    console.log(data);

    const result = await productServices.addProduct(data);

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          classname={styles.form__input}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Insert product description"
          classname={styles.form__input}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert product price"
          classname={styles.form__input}
        />
        <Select
          name="category"
          label="Category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          className={styles.form__select}
        />
        <Select
          name="status"
          label="Status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          className={styles.form__select}
        />

        <label htmlFor="image">Image</label>
        <div className={styles.form__image}>
          {uploadedImage ? (
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(uploadedImage)}
              alt="product-image"
              className={styles.form__image__preview}
            />
          ) : (
            <div className={styles.form__image__placeholder}>No Image</div>
          )}

          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>

        <label htmlFor="stock" className={styles.form__label}>
          Stock
        </label>
        {stockCount.map(
          (item: { size: string; qty: number }, index: number) => (
            <div className={styles.form__stock} key={index}>
              <div className={styles.form__stock__item}>
                <Input
                  label="Size"
                  name="size"
                  type="text"
                  placeholder="Insert product size"
                  classname={styles.form__stock__item__input}
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
