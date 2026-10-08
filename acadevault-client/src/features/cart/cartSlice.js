import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Initial state (SSR-safe)
const initialState = {
  localCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Initializes cart manually (optional, not needed with Redux Persist)
     */
    initializeLocalCart(state, action) {
      state.localCart = action.payload || [];
    },

    /**
     * Add an item to the local cart
     */
    addToLocalCart(state, action) {
      const {
        materialId,
        slug,
        title,
        price,
        currency,
        thumbnail,
        quantity = 1,
      } = action.payload;
      const existingItem = state.localCart.find(
        (item) => item.materialId === materialId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        // console.log("Item updated in localCart:", state.localCart);
        toast.success(`Increased quantity for "${title}"`);
      } else {
        state.localCart.push({
          materialId,
          slug,
          title,
          price,
          currency,
          quantity,
          thumbnail,
        });
        // console.log("Item added to localCart:", state.localCart);
        toast.success(`"${title}" added to cart!`);
      }
    },

    /**
     * Remove an item from the local cart
     */
    removeFromLocalCart(state, action) {
      const materialId = action.payload;
      const item = state.localCart.find(
        (item) => item.materialId === materialId
      );

      if (item) {
        state.localCart = state.localCart.filter(
          (item) => item.materialId !== materialId
        );
        toast.success(`Removed "${item.title}" from cart!`);
      }
    },

    /**
     * Update the quantity of an item
     */
    updateLocalCartQuantity(state, action) {
      const { materialId, quantity } = action.payload;
      const item = state.localCart.find(
        (item) => item.materialId === materialId
      );

      if (item) {
        if (quantity < 1) {
          state.localCart = state.localCart.filter(
            (item) => item.materialId !== materialId
          );
          toast.success(`Removed "${item.title}" from cart`);
        } else {
          item.quantity = quantity;
          toast.success(`Updated quantity for "${item.title}"`);
        }
      }
    },

    /**
     * Clears all items from local cart
     */
    clearLocalCart(state) {
      state.localCart = [];
      toast.success("Cart cleared!");
    },
  },
});

// Selectors
export const selectLocalCart = (state) => state.cart.localCart;

// Actions
export const {
  initializeLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  updateLocalCartQuantity,
  clearLocalCart,
} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
