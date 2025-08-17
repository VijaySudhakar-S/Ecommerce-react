import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : [],
    reducers : {
        addItem(state,action){
            state.push(action.payload)
        },
        removeItem(state,action){
            let item = action.payload
            return state.filter((c) => c.id != item.id)
        }
    }
})



export default cartSlice.reducer
export let {addItem, removeItem} = cartSlice.actions