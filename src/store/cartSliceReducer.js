import { createSlice } from "@reduxjs/toolkit";
import api from "../api"; 

const cartLocalStorage = JSON.parse(localStorage.getItem("cart"))

const cartSlice = createSlice({
    name: "cart",
    initialState: cartLocalStorage ? cartLocalStorage : [],
    reducers: {
        // Set entire cart (for initial load from backend)
        setCart(state, action) {
            return action.payload;
        },
        
        // Add to cart
        addItem(state, action) {
            const user = JSON.parse(localStorage.getItem("user"));
            const existingItem = state.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + (action.payload.quantity || 1);
            } else {
                state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            if (user) {
                const payload = state.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }));
                api.post(`/users/${user._id}/cart`, { cart: payload });
            } else {
                localStorage.setItem("cart", JSON.stringify([...state]));
            }
        },
        
        removeItem(state, action) {
            let item = action.payload;
            let filteredProducts = state.filter((c) => c._id !== item._id);
            const user = JSON.parse(localStorage.getItem("user"));

            if(user){
                const payload = filteredProducts.map(i => ({
                    productId: i._id,
                    quantity: i.quantity
                }));
                api.post(`/users/${user._id}/cart`, { cart: payload });
            } else {
                localStorage.setItem("cart", JSON.stringify([...filteredProducts]));
            }

            return filteredProducts;
        },

        // Update product in cart
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.find(item => item._id === id);
            const user = JSON.parse(localStorage.getItem("user"));

            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;

                if (user) {
                    const payload = state.map(i => ({
                        productId: i._id,
                        quantity: i.quantity
                    }));
                    api.post(`/users/${user._id}/cart`, { cart: payload });
                } else {
                    localStorage.setItem("cart", JSON.stringify([...state]));
                }
            }
        }
    }
})

export default cartSlice.reducer
export let { setCart, addItem, removeItem, updateQuantity } = cartSlice.actions