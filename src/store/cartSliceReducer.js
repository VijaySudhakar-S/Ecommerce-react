import { createSlice } from "@reduxjs/toolkit";

const cartLocalStorage = JSON.parse(localStorage.getItem("cart"))

const cartSlice = createSlice({
    name : "cart",
    initialState : cartLocalStorage ? cartLocalStorage : [],
    reducers : {
        addItem(state,action){
            state.push(action.payload)
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        removeItem(state,action){
            let item = action.payload
            let filteredProducts = state.filter((c) => c.id != item.id)
            localStorage.setItem("cart", JSON.stringify([...filteredProducts]))
            return filteredProducts
        }
    }
})



export default cartSlice.reducer
export let {addItem, removeItem} = cartSlice.actions