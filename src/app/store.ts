import { configureStore } from "@reduxjs/toolkit";
import productsInCartReducer from "../features/cart/productsInCartSlice";

const store = configureStore({
  reducer: {
    productsInCart: productsInCartReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch