import React from "react";
import styles from "./header.module.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider";

const Header = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <p className={`pointer ${styles.title}`} onClick={gotoHome}>
        Flipkart
      </p>

      <span className={styles.badgeContainer}>
        <i
          className={`fas fa-shopping-cart pointer ${styles.icon}`}
          onClick={gotoCart}
        ></i>
        <span className={`flex-center ${styles.badge}`}>
          {state.totalItems}
        </span>
      </span>
    </header>
  );
};

export default Header;
