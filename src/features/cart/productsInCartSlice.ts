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
    updateProductsInCart:(state,action)=>{
      const backup = action.payload;
      return backup;
    }
  },
});

export const { productAdded, productRemoved, updateProductsInCart } = productsInCartSlice.actions;

export default productsInCartSlice.reducer;
