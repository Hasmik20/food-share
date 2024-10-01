"use client";
import { useRef, useState } from "react";
import styles from "./imgPicker.module.css";
import Image from "next/image";

const ImgPicker = ({ label, name }) => {
  const [pickedImg, setPickedImg] = useState(null);
  const inputRef = useRef();

  const onPickImg = () => {
    inputRef.current.click();
  };

  const handelImgChange = (e) => {
    const files = e.target.files[0];
    if (!files) {
      setPickedImg(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImg(fileReader.result);
    };
    fileReader.readAsDataURL(files);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImg && <p>No image picked yet!</p>}
          {pickedImg && (
            <Image src={pickedImg} alt="Your selected image" fill />
          )}
        </div>
        <input
          ref={inputRef}
          className={styles.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg "
          onChange={handelImgChange}
          required
        />
      </div>
      <button className={styles.button} type="button" onClick={onPickImg}>
        Pick an image
      </button>
    </div>
  );
};

export default ImgPicker;
