import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ICart } from "common/types";

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

export const addToCart = createAsyncThunk<ICart, string, { rejectValue: string }>('cart/addItem', async (skuId, { dispatch }) => {
  try {
    const response = await axios.patch('/carts', {
      skuId
    })

    const { cart, increased } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: increased ? "You have this item in your bag and we have increased the quantity by 1" : "Added to bag",
        status: "success"
      }
    })

    return cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const moveToWishlist = createAsyncThunk<ICart, { productId: string, skuId: string }[], { rejectValue: string }>('cart/moveToWishlist', async (skus, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/moveToWishlist`, {
      skus
    });
    const cart = response.data.cart;

    dispatch({
      type: 'wishlist/updateWishlist', payload: response.data.wishlist
    })

    dispatch({
      type: 'toast/addToast', payload: {
        message: `${skus.length} item${skus.length > 1 ? 's' : ''} moved to wishlist`,
        status: "success"
      }
    })

    return cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeFromCart = createAsyncThunk<ICart, string, { rejectValue: string }>('cart/removeItem', async (skuId, { dispatch }) => {
  try {
    const response = await axios.delete(`/carts/${skuId}`);

    dispatch({
      type: 'toast/addToast', payload: {
        message: `1 item removed from wishlist`,
        status: "success"
      }
    })

    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeMultiplesFromCart = createAsyncThunk<ICart, string[], { rejectValue: string }>('cart/removeMultiples', async (skuIds, { dispatch }) => {
  try {
    const response = await axios.delete(`/carts/removeMultiples`, {
      data: {
        skuIds
      }
    });

    dispatch({
      type: 'toast/addToast', payload: {
        message: `${skuIds.length} item${skuIds.length > 1 ? 's' : ''} removed from cart`,
        status: "success"
      }
    })

    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const selectItem = createAsyncThunk<ICart, string, { rejectValue: string }>('cart/selectItem', async (skuId, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}/selectItem`, {
      shouldSelect: true
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const unSelectItem = createAsyncThunk<ICart, string, { rejectValue: string }>('cart/unSelectItem', async (skuId, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}/selectItem`, {
      shouldSelect: false
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const selectAllItems = createAsyncThunk<ICart, never, { rejectValue: string }>('cart/selectAllItems', async (arg, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/selectAllItems`, {
      shouldSelect: true
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const unSelectAllItems = createAsyncThunk<ICart, never, { rejectValue: string }>('cart/unSelectAllItems', async (arg, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/selectAllItems`, {
      shouldSelect: false
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const fetchCart = createAsyncThunk<ICart, never, { rejectValue: string }>('cart/fetchCart', async (arg, { dispatch }) => {
  try {
    const response = await axios.get('/carts')
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const changeQuantity = createAsyncThunk<ICart, { skuId: string, quantity: number }, { rejectValue: string }>('cart/changeQuantity', async ({ skuId, quantity }, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}`, {
      quantity
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const changeSku = createAsyncThunk<ICart, { skuId: string, newSkuId: string }, { rejectValue: string }>('cart/changeSku', async ({ skuId, newSkuId }, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}`, {
      newSkuId
    });
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});
