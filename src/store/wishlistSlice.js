import { createSlice } from "@reduxjs/toolkit";

const wishlistSclice = createSlice({
    name : "wishlist",
    initialState : [],
    reducers : {
        addwishlist(state,action){
            state.push(action.payload)
        },
        removewishlist(state,action){
            let item = action.payload
            return state.filter((w)=>w.id != item.id)
        }
    }
})

export default wishlistSclice.reducer
export let {addwishlist,removewishlist} = wishlistSclice.actions
