import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { fetchWishlist, addToWishlist, removeFromWishlist, removeAllFromWishlist, moveToCart } from "./thunks";

import { IWishlistSliceState } from "./slice";
import axios from "axios";

const wishlistAsyncThunks = [fetchWishlist, addToWishlist, removeFromWishlist, removeAllFromWishlist, moveToCart];

export const wishlistExtraReducers = (builder: ActionReducerMapBuilder<IWishlistSliceState>) => {
  wishlistAsyncThunks.forEach(thunk => {
    builder.addCase(thunk.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    })
    builder.addCase(thunk.rejected, (state, action) => {
      if (axios.isAxiosError(state.error)) {
        state.error = state.error.response.data.error
      } else {
        state.error = "Some error occurred";
      }
      state.loading = false;
    })
  })
}
