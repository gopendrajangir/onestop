import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { addToCart, fetchCart, selectItem, unSelectItem, selectAllItems, unSelectAllItems, changeQuantity, changeSku, removeFromCart, removeMultiplesFromCart, moveToWishlist } from "./thunks";

import { ICartSliceState } from "./slice";
import axios from "axios";

const cartAsyncThunks = [addToCart, fetchCart, selectItem, unSelectItem, selectAllItems, unSelectAllItems, changeQuantity, changeSku, removeFromCart, removeMultiplesFromCart, moveToWishlist];

export const cartExtraReducers = (builder: ActionReducerMapBuilder<ICartSliceState>) => {
  cartAsyncThunks.forEach(thunk => {
    builder.addCase(thunk.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
      state.cart = action.payload;
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
