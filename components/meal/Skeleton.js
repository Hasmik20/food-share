import React from "react";

import styles from "./skeleton.module.css";

export const Skeleton = () => {
  return (
    <div className={styles.meals}>
      {...Array(6)
        .fill(0)
        .map((_, i) => <Item key={i} />)}
    </div>
  );
};

const Item = () => {
  return (
    <article className={styles.meal}>
      <header>
        <div className={styles.image}></div>
        <div className={styles.headerText}></div>
      </header>
      <div className={styles.content}></div>
    </article>
  );
};
