import React from "react";
import styles from "./product.module.css";
import data from "../../data/products.json";
import Card from "../../components/card/Card";

const ProductListing = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.listWrapper}>
        {data.products.map((item) => (
          <Card {...item} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
