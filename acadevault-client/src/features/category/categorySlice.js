import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategoryId: null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  activeTab: "details", // or "subcategories", "settings", etc.
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
    },
    openCreateModal(state) {
      state.isCreateModalOpen = true;
    },
    closeCreateModal(state) {
      state.isCreateModalOpen = false;
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
    },
    closeEditModal(state) {
      state.isEditModalOpen = false;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    resetCategoryUI(state) {
      return initialState;
    },
  },
});

export const {
  setSelectedCategoryId,
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  setActiveTab,
  resetCategoryUI,
} = categorySlice.actions;

export default categorySlice.reducer;
