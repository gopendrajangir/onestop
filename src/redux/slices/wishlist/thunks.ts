import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IWishlist } from "common/types";

const errorToastDispatcher = (err, dispatch) => {
  if (axios.isAxiosError(err)) {
    dispatch({
      type: 'toast/addToast', payload: {
        message: err.response.data.error,
        status: "failed"
      }
    })
  } else {
    dispatch({
      type: 'toast/addToast', payload: {
        message: "Some error occured",
        status: "failed"
      }
    })
  }
  throw err;
}

export const fetchWishlist = createAsyncThunk<IWishlist, never, { rejectValue: string }>('wishlist/fetchWishlist', async (arg, { dispatch }) => {
  try {
    const response = await axios.get(`/wishlists`)

    const wishlist = response.data.wishlist;

    return wishlist;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const moveToCart = createAsyncThunk<IWishlist, { productId: string, skuId: string }, { rejectValue: string }>('wishlist/moveToCart', async ({ productId, skuId }, { dispatch }) => {
  try {
    const response = await axios.patch(`/wishlists/${productId}/moveToCart`, {
      skuId
    })

    const wishlist = response.data.wishlist;

    dispatch({
      type: 'cart/updateCart', payload: response.data.cart
    })

    dispatch({
      type: 'toast/addToast', payload: {
        message: "1 item moved to bag",
        status: "success"
      }
    })

    return wishlist;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const addToWishlist = createAsyncThunk<IWishlist, string, { rejectValue: string }>('wishlist/addItem', async (productId, { dispatch }) => {
  try {
    const response = await axios.patch(`/wishlists/${productId}`)

    const wishlist = response.data.wishlist;

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Added to wishlist",
        status: "success"
      }
    })

    return wishlist;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeFromWishlist = createAsyncThunk<IWishlist, string, { rejectValue: string }>('wishlist/removeItem', async (productId, { dispatch }) => {
  try {
    const response = await axios.delete(`/wishlists/${productId}`)

    const wishlist = response.data.wishlist;

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Removed from wishlist",
        status: "success"
      }
    })

    return wishlist;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeAllFromWishlist = createAsyncThunk<IWishlist, never, { rejectValue: string }>('wishlist/removeAllItems', async (arg, { dispatch }) => {
  try {
    const response = await axios.delete(`/wishlists/removeAllFromWishlist`);

    const wishlist = response.data.wishlist;

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Removed items from wishlist",
        status: "success"
      }
    })

    return wishlist;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});
