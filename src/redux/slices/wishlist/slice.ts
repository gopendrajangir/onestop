import { createSlice } from "@reduxjs/toolkit";
import { IWishlist } from "common/types";
import { wishlistExtraReducers } from "./extraReducers";

export interface IWishlistSliceState {
  loading: boolean;
  wishlist?: IWishlist;
  error?: string;
}

const initialState: IWishlistSliceState = {
  loading: false
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    updateWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addItems: (state, action) => {
      action.payload.forEach((item) => {
        if (!state.wishlist.items.some(({ _id }) => _id === item._id)) {
          state.wishlist.items.push(item);
        }
      })
      state.wishlist = { ...state.wishlist };
    },
    removeWishlist: (state, action) => {
      state.wishlist = null;
    }
  },
  extraReducers: wishlistExtraReducers
})

export const { removeWishlist } = wishlistSlice.actions;

export default wishlistSlice;