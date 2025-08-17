import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSliceReducer"
import wishlistSlice from "./wishlistSlice"

export const store = configureStore({
    reducer : {
        cart : cartSliceReducer,
        wishlist : wishlistSlice
     }
})