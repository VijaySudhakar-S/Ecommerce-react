import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

let localStorageData = JSON.parse(localStorage.getItem("wishlist"));

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: localStorageData ? localStorageData : [],
    reducers: {
        // Set entire wishlist (for initial load from backend)
        setWishlist(state, action) {
            const newWishlist = action.payload;
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            return newWishlist;
        },
        
        addwishlist(state, action) {
            const product = action.payload;
            // Check if product already exists
            const existingProduct = state.find(item => item._id === product._id);
            if (!existingProduct) {
                state.push(product);
                localStorage.setItem("wishlist", JSON.stringify([...state]));
                
                // Sync with backend if user is logged in
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    try {
                        api.post(`/users/${user._id}/wishlist`, { 
                            productId: product._id 
                        });
                    } catch (error) {
                        console.error("Error syncing wishlist with backend:", error);
                    }
                }
            }
        },
        
        removewishlist(state, action) {
            const item = action.payload;
            const filteredProducts = state.filter((w) => w._id !== item._id);
            localStorage.setItem("wishlist", JSON.stringify([...filteredProducts]));
            
            // Sync with backend if user is logged in
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                try {
                    api.delete(`/users/${user._id}/wishlist/${item._id}`);
                } catch (error) {
                    console.error("Error syncing wishlist removal with backend:", error);
                }
            }
            
            return filteredProducts;
        },

        // Clear entire wishlist
        clearWishlist(state) {
            localStorage.removeItem("wishlist");
            
            // Sync with backend if user is logged in
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                try {
                    // You might need to implement a clear endpoint or remove individually
                    state.forEach(item => {
                        api.delete(`/users/${user._id}/wishlist/${item._id}`);
                    });
                } catch (error) {
                    console.error("Error clearing wishlist from backend:", error);
                }
            }
            
            return [];
        }
    } 
});

export default wishlistSlice.reducer;
export let { setWishlist, addwishlist, removewishlist, clearWishlist } = wishlistSlice.actions;