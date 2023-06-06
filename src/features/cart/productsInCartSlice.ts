import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(localStorage.getItem("productsInCart") || "[]") || [];

const productsInCartSlice = createSlice({
  name: "productsInCart",
  initialState,
  reducers: {
    productAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { productAdded } = productsInCartSlice.actions;

export default productsInCartSlice.reducer;
