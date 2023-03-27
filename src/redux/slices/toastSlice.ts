import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type ToastStatusType = "success" | "failed"

export interface IToast {
  id: string;
  message: string;
  status: ToastStatusType
}

export interface IToastSliceState {
  toasts: IToast[]
}

const initialState: IToastSliceState = {
  toasts: []
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const id = uuidv4();
      const { message, status } = action.payload;
      const toast = {
        id,
        message,
        status,
      };

      state.toasts.push(toast);

    },
    removeToast: (state, action) => {
      const id = action.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    }
  }
})

export const { addToast, removeToast } = toastSlice.actions

export default toastSlice;