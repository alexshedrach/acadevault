import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMaterialId: null,
  sortOrder: "latest",
  filters: {
    level: null,
    subject: null,
  },
};

const materialsUiSlice = createSlice({
  name: "materialsUi",
  initialState,
  reducers: {
    setSelectedMaterialId: (state, action) => {
      state.selectedMaterialId = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSelectedMaterialId, setSortOrder, setFilters, resetFilters } =
  materialsUiSlice.actions;

export default materialsUiSlice.reducer;
