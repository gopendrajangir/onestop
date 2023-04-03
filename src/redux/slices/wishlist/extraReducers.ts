import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { fetchWishlist, addToWishlist, removeFromWishlist, removeAllFromWishlist, moveToCart } from "./thunks";

import { IWishlistSliceState } from "./slice";
import axios from "axios";

export const wishlistExtraReducers = (builder: ActionReducerMapBuilder<IWishlistSliceState>) => {

  // Fetch wishlist

  builder.addCase(fetchWishlist.fulfilled, (state, action) => {
    state.wishlist = action.payload;
    state.loading = false;
  })

  // Move to Cart

  builder.addCase(moveToCart.fulfilled, (state, action) => {
    state.wishlist.items = state.wishlist.items.filter(({ _id }) => _id !== action.payload);
    state.wishlist = { ...state.wishlist };
    state.loading = false;
  })

  // Remove all from Wishlist

  builder.addCase(removeAllFromWishlist.fulfilled, (state, action) => {
    state.wishlist.items = [];
    state.wishlist = { ...state.wishlist };
    state.loading = false;
  })

  // Remove from Wishlist

  builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
    state.wishlist.items = state.wishlist.items.filter(({ _id }) => _id !== action.payload);
    state.wishlist = { ...state.wishlist };
    state.loading = false;
  })

  // Add to Wishlist

  builder.addCase(addToWishlist.fulfilled, (state, action) => {
    if (!state.wishlist.items.some(({ _id }) => _id === action.payload._id)) {
      state.wishlist.items.push(action.payload);
      state.wishlist = { ...state.wishlist };
    }
    state.loading = false;
  })

  // Action Pending

  builder.addMatcher((action) => (action.type.startsWith('wishlist') && action.type.endsWith('/pending')), (state, action) => {
    state.loading = true;
  })

  // Action Rejected

  builder.addMatcher((action) => (action.type.startsWith('wishlist') && action.type.endsWith('/rejected')), (state, action) => {
    if (axios.isAxiosError(state.error)) {
      state.error = state.error.response.data.error
    } else {
      state.error = "Some error occurred";
    }
    state.loading = false;
  })
}
