import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ICart, ICartItem } from "common/types";

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

export const fetchCart = createAsyncThunk<ICart, never, { rejectValue: string }>('cart/fetchCart', async (arg, { dispatch }) => {
  try {
    const response = await axios.get('/carts')
    return response.data.cart;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const addToCart = createAsyncThunk<ICartItem, string, { rejectValue: string }>('cart/addItem', async (skuId, { dispatch }) => {
  try {
    const response = await axios.patch('/carts', {
      skuId
    })

    const { cartItem, increased } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: increased ? "You have this item in your bag and we have increased the quantity by 1" : "Added to bag",
        status: "success"
      }
    })

    return cartItem;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const moveToWishlist = createAsyncThunk<string[], { productId: string, skuId: string }[], { rejectValue: string }>('cart/moveToWishlist', async (skus, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/moveToWishlist`, {
      skus
    });

    dispatch({
      type: 'wishlist/addItems', payload: response.data.wishlistItems
    })

    dispatch({
      type: 'toast/addToast', payload: {
        message: `${skus.length} item${skus.length > 1 ? 's' : ''} moved to wishlist`,
        status: "success"
      }
    })

    return skus.map(({ skuId }) => skuId);
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeFromCart = createAsyncThunk<string, string, { rejectValue: string }>('cart/removeItem', async (skuId, { dispatch }) => {
  try {
    await axios.delete(`/carts/${skuId}`);

    dispatch({
      type: 'toast/addToast', payload: {
        message: `1 item removed from wishlist`,
        status: "success"
      }
    })

    return skuId;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const removeMultiplesFromCart = createAsyncThunk<string[], string[], { rejectValue: string }>('cart/removeMultiples', async (skuIds, { dispatch }) => {
  try {
    await axios.delete(`/carts/removeMultiples`, {
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

    return skuIds;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const selectItem = createAsyncThunk<string, string, { rejectValue: string }>('cart/selectItem', async (skuId, { dispatch }) => {
  try {
    await axios.patch(`/carts/${skuId}/selectItem`, {
      shouldSelect: true
    });
    return skuId;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const unSelectItem = createAsyncThunk<string, string, { rejectValue: string }>('cart/unSelectItem', async (skuId, { dispatch }) => {
  try {
    await axios.patch(`/carts/${skuId}/selectItem`, {
      shouldSelect: false
    });
    return skuId;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const selectAllItems = createAsyncThunk<null, never, { rejectValue: string }>('cart/selectAllItems', async (arg, { dispatch }) => {
  try {
    await axios.patch(`/carts/selectAllItems`, {
      shouldSelect: true
    });
    return null;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const unSelectAllItems = createAsyncThunk<null, never, { rejectValue: string }>('cart/unSelectAllItems', async (arg, { dispatch }) => {
  try {
    await axios.patch(`/carts/selectAllItems`, {
      shouldSelect: false
    });
    return null;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});


export const changeQuantity = createAsyncThunk<ICartItem, { skuId: string, quantity: number }, { rejectValue: string }>('cart/changeQuantity', async ({ skuId, quantity }, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}`, {
      quantity
    });
    return response.data.cartItem;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});

export const changeSku = createAsyncThunk<ICartItem, { skuId: string, newSkuId: string }, { rejectValue: string }>('cart/changeSku', async ({ skuId, newSkuId }, { dispatch }) => {
  try {
    const response = await axios.patch(`/carts/${skuId}`, {
      newSkuId
    });
    return response.data.cartItem;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
});
