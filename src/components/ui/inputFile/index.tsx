import React, { Dispatch, SetStateAction } from "react";
import styles from "./Input.module.scss";

type Proptypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

export default function InputFile({
  uploadedImage,
  setUploadedImage,
  name,
}: Proptypes) {
  return (
    <div className={styles.file}>
      <label htmlFor={name} className={styles.file__label}>
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>
              Upload a new image, larger image will be resized automatically
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={styles.file__input}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
}
