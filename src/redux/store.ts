import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cart/slice';
import profileSlice from './slices/profile/slice';
import toastSlice from './slices/toastSlice';
import wishlistSlice from './slices/wishlist/slice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    toast: toastSlice.reducer,
    wishlist: wishlistSlice.reducer,
    profile: profileSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>

export default store;