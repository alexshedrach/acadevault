import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedShop: null, // currently viewed/selected shop
  editMode: false, // toggles between view/edit
  shopFilters: {}, // UI filters (e.g. by country, category)
  modal: {
    open: false,
    mode: null, // e.g., 'CREATE', 'EDIT', 'DELETE'
    payload: null,
  },
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSelectedShop: (state, action) => {
      state.selectedShop = action.payload;
    },
    clearSelectedShop: (state) => {
      state.selectedShop = null;
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    setShopFilters: (state, action) => {
      state.shopFilters = { ...state.shopFilters, ...action.payload };
    },
    resetShopFilters: (state) => {
      state.shopFilters = {};
    },
    openShopModal: (state, action) => {
      state.modal = {
        open: true,
        mode: action.payload.mode,
        payload: action.payload.payload || null,
      };
    },
    closeShopModal: (state) => {
      state.modal = { open: false, mode: null, payload: null };
    },
  },
});

export const {
  setSelectedShop,
  clearSelectedShop,
  toggleEditMode,
  setShopFilters,
  resetShopFilters,
  openShopModal,
  closeShopModal,
} = shopSlice.actions;

export default shopSlice.reducer;

// Would you like me to also scaffold:

// ShopContext with React Context if you're lifting shop state outside Redux?

// ShopModalManager component to use the modal slice state?

// shopSelectors for reusable useSelector patterns?
