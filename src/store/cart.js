import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { calculateDiscount } from "../utils/utilis";

const initialCart = {
  cart: [],
};

const cartStore = (set, get) => ({
  ...initialCart,

  addCart: (item) => {
    set((state) => {
      const existingCartIndex = state.cart.findIndex(
        (cartItem) => cartItem.id == item.id
      );
      const updatedItems = [...state.cart];
      const existingItem = state.cart[existingCartIndex];
      // Item is already present in cart

      if (existingCartIndex > -1) {
        if (
          existingItem.quantity < 10 &&
          existingItem.discountPrice < Number.MAX_SAFE_INTEGER
        ) {
          const updatedItem = {
            ...existingItem,
            discount: existingItem.discount,
            quantity: existingItem.quantity + 1,
            price: existingItem.actualPrice + existingItem.price,
            calculatedDiscountPrice:calculateDiscount(existingItem.actualPrice + existingItem.price, existingItem.discount,existingItem.discountType),
            totalPrice:existingItem.discountPrice * (existingItem.quantity + 1)
          };
          updatedItems[existingCartIndex] = updatedItem;
        }
      }
      // Item doesn't exist in cart
      else {
        updatedItems.push({
          ...item,
          quantity: 1,
          actualPrice: +item.price,
          price: +item.price,
          discount: +item.discount,
          totalPrice: calculateDiscount(+item.price, +item.discount,item.discountType),
          discountPrice: calculateDiscount(+item.price, +item.discount,item.discountType),
          calculatedDiscountPrice:calculateDiscount(+item.price, +item.discount,item.discountType)
        });
      }

      return {
        cart: [...updatedItems],
      };
    });
  },
  decreaseQuantity: (id) => {
    set((state) => {
      const existingCartIndex = state.cart.findIndex(
        (cartItem) => cartItem.id == id
      );
      const existingItem = state.cart[existingCartIndex];
      const updatedItems = [...state.cart];
      if (existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
          price: existingItem.price - existingItem.actualPrice,
          totalPrice: existingItem.totalPrice - existingItem.discountPrice,
          calculatedDiscountPrice: calculateDiscount(existingItem.price - existingItem.actualPrice, existingItem.discount,existingItem.discountType)
        };
        updatedItems[existingCartIndex] = updatedItem;
      }
      return {
        cart: [...updatedItems],
      };
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      return {
        cart: state.cart.filter((cartItem) => cartItem.id != id),
      };
    });
  },
  itemInCart: (id) => {
    const inCart = useCartStore
      .getState()
      .cart.findIndex((cartItem) => cartItem?.id == id);
    return inCart > -1 ? true : false;
  },
  removeAll: () => {
    set(initialCart);
  },
});

const useCartStore = create(
  devtools(
    persist(cartStore, {
      name: "cartItems",
    })
  )
);
export default useCartStore;
