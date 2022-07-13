import React, { useEffect, useRef } from "react";
import styles from "./cart.module.css";
import { useCart } from "../../context/CartProvider";
import Card from "../../components/card/Card";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const {
    state: { cartItems, totalItems, totalPrice, totalDiscount, savedItems },
  } = useCart();
  const location = useLocation();
  const savedRef = useRef(null);

  const ProducList = () => {
    return (
      <section className={styles.listSection}>
        <ul className={styles.list}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Card {...item} key={item.id} item={item} />
            ))
          ) : (
            <p className="t4 pd-1x">No items in cart</p>
          )}
        </ul>
      </section>
    );
  };

  const totalCalculatedPrice = totalPrice - totalDiscount;

  const DetailSection = () => {
    return (
      <section className={` flex-center ${styles.detailSection}`}>
        <article className={styles.detailCard}>
          <p className="t3 text-center mg-bottom-5x">Summary</p>
          <p className={` mg-top-2x ${styles.title}`}>Items : {totalItems}</p>
          <p className={` mg-top-2x ${styles.title}`}>Price : ₹ {totalPrice}</p>
          <p className={` mg-top-2x ${styles.title}`}>
            Discount : ₹ {totalDiscount}
          </p>
          <hr className="mg-top-5x" />
          <p className={` mg-top-2x ${styles.title}`}>
            Total Price : ₹ {totalCalculatedPrice}
          </p>
        </article>
      </section>
    );
  };

  const SavedSection = () => {
    return (
      <>
        <p className={`t4 ${styles.savedTitle}`} ref={savedRef}>
          Saved
        </p>
        <section className={styles.savedWrapper}>
          {savedItems.length > 0 &&
            savedItems.map((item) => (
              <Card {...item} key={item.id} item={item} />
            ))}
        </section>
      </>
    );
  };

  useEffect(() => {
    if (location.state?.isSaved) {
      savedRef.current.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state?.isSaved]);

  return (
    <>
      <main className={styles.wrapper}>
        <ProducList />
        <DetailSection />
      </main>
      <SavedSection />
    </>
  );
};

export default Cart;
