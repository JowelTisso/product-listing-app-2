import { CART } from "../utils/Constant";

export const reducer = (state, action) => {
  const index = state.cartItems.findIndex(
    (item) => item.id === action.payload.item.id
  );
  switch (action.type) {
    case CART.ADD_TO_CART:
      const item = { ...action.payload.item, quantity: 1 };
      return {
        ...state,
        cartItems: [...state.cartItems, item],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.item.price,
        totalDiscount: state.totalDiscount + action.payload.item.discount,
      };
    case CART.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (item) => item.id !== action.payload.item.id
        ),
        totalItems: state.totalItems - action.payload.item.quantity,
        totalPrice:
          state.totalPrice -
          action.payload.item.price * action.payload.item.quantity,
        totalDiscount:
          state.totalDiscount -
          action.payload.item.discount * action.payload.item.quantity,
      };
    case CART.INCREMENT:
      state.cartItems[index].quantity += 1;
      return {
        ...state,
        cartItems: [...state.cartItems],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.item.price,
        totalDiscount: state.totalDiscount + action.payload.item.discount,
      };
    case CART.DECREMENT:
      state.cartItems[index].quantity -= 1;
      return {
        ...state,
        cartItems: [...state.cartItems],
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - action.payload.item.price,
        totalDiscount: state.totalDiscount - action.payload.item.discount,
      };
    case CART.ADD_TO_SAVED:
      return {
        ...state,
        savedItems: [...state.savedItems, action.payload.item],
      };
    case CART.REMOVE_FROM_SAVED:
      return {
        ...state,
        savedItems: [...state.savedItems].filter(
          (item) => item.id !== action.payload.item.id
        ),
      };
    case CART.MOVE_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.item],
        totalItems: state.totalItems + action.payload.item.quantity,
        totalPrice:
          state.totalPrice +
          action.payload.item.price * action.payload.item.quantity,
        totalDiscount:
          state.totalDiscount +
          action.payload.item.discount * action.payload.item.quantity,
      };
    default:
      break;
  }
};
