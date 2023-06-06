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
    productRemoved:(state, action)=>{
      const newProductsInCart = action.payload;
      return newProductsInCart; 
    },
  },
});

export const { productAdded, productRemoved } = productsInCartSlice.actions;

export default productsInCartSlice.reducer;
