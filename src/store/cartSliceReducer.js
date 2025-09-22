import { createSlice } from "@reduxjs/toolkit";

const cartLocalStorage = JSON.parse(localStorage.getItem("cart"))

const cartSlice = createSlice({
    name : "cart",
    initialState : cartLocalStorage ? cartLocalStorage : [],
    reducers : {
        addItem(state,action){
            // Check if item already exists
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + (action.payload.quantity || 1);
            } else {
                state.push({...action.payload, quantity: action.payload.quantity || 1});
            }
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        removeItem(state,action){
            let item = action.payload
            let filteredProducts = state.filter((c) => c.id != item.id)
            localStorage.setItem("cart", JSON.stringify([...filteredProducts]))
            return filteredProducts
        },
        updateQuantity(state, action){
            const { id, quantity } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify([...state]))
            }
        }
    }
})

export default cartSlice.reducer
export let {addItem, removeItem, updateQuantity} = cartSlice.actions