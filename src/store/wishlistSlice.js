import { createSlice } from "@reduxjs/toolkit";

let localStorageData = JSON.parse(localStorage.getItem("wishlist"))

const wishlistSclice = createSlice({
    name : "wishlist",
    initialState : localStorageData ? localStorageData : [],
    reducers : {
        addwishlist(state,action){
            state.push(action.payload)
            localStorage.setItem("wishlist",JSON.stringify([...state]))
        },
        removewishlist(state,action){
            let item = action.payload
            let filteredProducts = state.filter((w)=>w.id != item.id)
            localStorage.setItem("wishlist",JSON.stringify([...filteredProducts]))
            return filteredProducts
        }
    } 
})

export default wishlistSclice.reducer
export let {addwishlist,removewishlist} = wishlistSclice.actions
