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
    addCartItem: (state, action) => {
      state.cart.items.push(action.payload);
      state.cart = { ...state.cart };
    },
    updateCartItem: (state, action) => {
      const itemIdx = state.cart.items.findIndex((_id) => _id === action.payload._id);
      state.cart.items[itemIdx] = action.payload;
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