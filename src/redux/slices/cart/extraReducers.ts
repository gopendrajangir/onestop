import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { addToCart, fetchCart, selectItem, unSelectItem, selectAllItems, unSelectAllItems, changeQuantity, changeSku, removeFromCart, removeMultiplesFromCart, moveToWishlist } from "./thunks";

import { ICartSliceState } from "./slice";
import axios from "axios";

export const cartExtraReducers = (builder: ActionReducerMapBuilder<ICartSliceState>) => {

  // Fetch cart

  builder.addCase(fetchCart.fulfilled, (state, action) => {
    state.cart = action.payload;
    state.loading = false;
  })

  // Move to wishlist

  builder.addCase(moveToWishlist.fulfilled, (state, action) => {
    action.payload.forEach(skuId => {
      state.cart.items = state.cart.items.filter(({ sku }) => sku._id !== skuId);
    })
    state.cart = { ...state.cart };
    state.loading = false;
  })

  // Unselect all items

  builder.addCase(unSelectAllItems.fulfilled, (state, action) => {

    state.cart.items = state.cart.items.map((item) => {
      item.selected = false;
      return item;
    })

    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Select all items

  builder.addCase(selectAllItems.fulfilled, (state, action) => {

    state.cart.items = state.cart.items.map((item) => {
      item.selected = true;
      return item;
    })

    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Unselect item

  builder.addCase(unSelectItem.fulfilled, (state, action) => {
    const itemIdx = state.cart.items.findIndex(({ sku }) => sku._id === action.payload);
    state.cart.items[itemIdx].selected = false;

    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Select item

  builder.addCase(selectItem.fulfilled, (state, action) => {
    const itemIdx = state.cart.items.findIndex(({ sku }) => sku._id === action.payload);
    state.cart.items[itemIdx].selected = true;

    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Remove multiples from cart

  builder.addCase(removeMultiplesFromCart.fulfilled, (state, action) => {
    state.cart.items = state.cart.items.filter(({ sku }) => !action.payload.includes(sku._id));

    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Change quantity

  builder.addCase(changeSku.fulfilled, (state, action) => {
    const itemIdx = state.cart.items.findIndex(({ _id }) => _id === action.payload._id);

    if (itemIdx > -1) {
      state.cart.items[itemIdx] = action.payload;
      state.cart = { ...state.cart };
    }

    state.loading = false;
  })

  // Change quantity

  builder.addCase(changeQuantity.fulfilled, (state, action) => {
    const itemIdx = state.cart.items.findIndex(({ _id }) => _id === action.payload._id);

    state.cart.items[itemIdx] = action.payload;
    state.cart = { ...state.cart };

    state.loading = false;
  })

  // Remove from cart

  builder.addCase(removeFromCart.fulfilled, (state, action) => {
    state.cart.items = state.cart.items.filter(({ sku }) => sku._id !== action.payload);
    state.cart = { ...state.cart };
    state.loading = false;
  })

  // Add to cart

  builder.addCase(addToCart.fulfilled, (state, action) => {
    const itemIdx = state.cart.items.findIndex(({ _id }) => _id === action.payload._id);

    if (itemIdx > -1) {
      state.cart.items[itemIdx] = action.payload;
    } else {
      state.cart.items.push(action.payload);
    }
    state.cart = { ...state.cart };
    state.loading = false;
  })

  // Action Pending

  builder.addMatcher((action) => (action.type.startsWith('cart') && action.type.endsWith('/pending')), (state, action) => {
    state.loading = true;
  })

  // Action Rejected

  builder.addMatcher((action) => (action.type.startsWith('cart') && action.type.endsWith('/rejected')), (state, action) => {
    if (axios.isAxiosError(state.error)) {
      state.error = state.error.response.data.error
    } else {
      state.error = "Some error occurred";
    }
    state.loading = false;
  })
}
