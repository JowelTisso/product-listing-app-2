import React from "react";
import { useCart } from "../../context/CartProvider";
import styles from "./card.module.css";
import productListingStyle from "../../pages/product/product.module.css";
import cartListingStyle from "../../pages/cart/cart.module.css";
import { CART } from "../../utils/Constant";
import { useNavigate, useLocation } from "react-router-dom";

const Card = ({ id, title, price, brand, size, image, rating, item }) => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  const inCart = state.cartItems.some((item) => item.id === id);
  const isSaved = state.savedItems.some((item) => item.id === id);

  const addToCart = () => {
    dispatch({ type: CART.ADD_TO_CART, payload: { item } });
  };

  const removeFromCart = () => {
    dispatch({ type: CART.REMOVE_FROM_CART, payload: { item } });
  };

  const increaseQuantity = () => {
    dispatch({ type: CART.INCREMENT, payload: { item } });
  };

  const decreaseQuantity = () => {
    if (item?.quantity > 1) {
      dispatch({ type: CART.DECREMENT, payload: { item } });
    }
  };

  const saveForLater = () => {
    removeFromCart();
    dispatch({ type: CART.ADD_TO_SAVED, payload: { item } });
  };

  const removeFromSaved = () => {
    dispatch({ type: CART.REMOVE_FROM_SAVED, payload: { item } });
  };

  const moveToCart = () => {
    dispatch({ type: CART.MOVE_TO_CART, payload: { item } });
    removeFromSaved();
  };

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoSaved = () => {
    navigate("/cart", { state: { isSaved: true } });
  };

  return (
    <div
      className={`card ${
        route === "/" ? productListingStyle.card : cartListingStyle.card
      } `}
    >
      <div className="txt-overlay-container">
        <img className="card-img" src={image} alt="card image" />
        <div className={`txt-overlay ${styles.title}`}>
          <p className="card-title">{title}</p>
          <p className="card-sub-title">₹{price}</p>
        </div>
      </div>
      <div className="card-content">
        <p className="card-description fw-3x">{brand}</p>
        <p className="card-description fw-3x">Size : {size}</p>
        <p className="card-description fw-3x">Rating : {rating.rate}</p>
      </div>
      {route === "/cart" && (
        <div className={styles.quantity}>
          <button
            className={`${item?.quantity < 2 && "disable"} pointer ${
              styles.btnQty
            }`}
            disabled={item?.quantity < 2}
            onClick={decreaseQuantity}
          >
            <i className="fas fa-minus"></i>
          </button>
          <p className="t4">{item?.quantity}</p>
          <button
            className={`pointer ${isSaved && "disable"} ${styles.btnQty}`}
            onClick={increaseQuantity}
            disabled={isSaved}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
      <div className="card-btn-container">
        <button
          className={`btn btn-primary ${styles.btnPrimary}`}
          onClick={
            route === "/"
              ? inCart
                ? gotoCart
                : isSaved
                ? gotoSaved
                : addToCart
              : isSaved
              ? moveToCart
              : removeFromCart
          }
        >
          {route === "/"
            ? inCart
              ? "GO TO CART"
              : isSaved
              ? "GO TO SAVED"
              : "ADD TO CART"
            : isSaved
            ? "MOVE TO CART"
            : "REMOVE FROM CART"}
        </button>
        {route === "/cart" && (
          <button
            className={`btn btn-secondary ${styles.btnSecondary}`}
            onClick={isSaved ? removeFromSaved : saveForLater}
          >
            {isSaved ? "REMOVE" : "SAVE FOR LATER"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
