import { createContext, useContext, useReducer } from "react";
import { reducer } from "./CartReducer";

const defaultValues = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  totalDiscount: 0,
  savedItems: [],
};

const CartContext = createContext(defaultValues);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
