import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "common/types";
import { cartExtraReducers } from "./extraReducers";

export interface ICartSliceState {
  loading: boolean;
  cart?: ICart;
  error?: string;
}

const initialState: ICartSliceState = {
  loading: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    removeCart: (state, action) => {
      state.cart = null
    }
  },
  extraReducers: cartExtraReducers
})

export const { updateCart } = cartSlice.actions;
export const { removeCart } = cartSlice.actions;

export default cartSlice;