import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IWishlist, IWishlistItem } from "common/types";

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

export const moveToCart = createAsyncThunk<string, { productId: string, skuId: string }, { rejectValue: string }>('wishlist/moveToCart', async ({ productId, skuId }, { dispatch }) => {
  try {
    const response = await axios.patch(`/wishlists/${productId}/moveToCart`, {
      skuId
    })

    const { cartItem, increased } = response.data;

    if (increased)
      dispatch({
        type: 'cart/updateCartItem', payload: cartItem
      })
    else
      dispatch({
        type: 'cart/addCartItem', payload: cartItem
      })

    dispatch({
      type: 'toast/addToast', payload: {
        message: "1 item moved to bag",
        status: "success"
      }
    })

    return productId;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const addToWishlist = createAsyncThunk<IWishlistItem, string, { rejectValue: string }>('wishlist/addItem', async (productId, { dispatch }) => {
  try {
    const response = await axios.patch(`/wishlists/${productId}`)

    const wishlistItem = response.data.wishlistItem;

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Added to wishlist",
        status: "success"
      }
    })

    return wishlistItem;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeFromWishlist = createAsyncThunk<string, string, { rejectValue: string }>('wishlist/removeItem', async (productId, { dispatch }) => {
  try {
    await axios.delete(`/wishlists/${productId}`)

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Removed from wishlist",
        status: "success"
      }
    })

    return productId;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeAllFromWishlist = createAsyncThunk<boolean, never, { rejectValue: string }>('wishlist/removeAllItems', async (arg, { dispatch }) => {
  try {
    await axios.delete(`/wishlists/removeAllFromWishlist`);

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Removed items from wishlist",
        status: "success"
      }
    })

    return true;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});
