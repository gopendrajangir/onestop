import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "axios";

import { addNewAddress, fetchProfile, removeAddress, setAddressAsCurrent, setAddressAsDefault, updateAddress, updateProfile } from "./thunks";


import { IProfileSliceState } from "./slice";

const profileAsyncThunks = [fetchProfile, updateProfile, addNewAddress, updateAddress, setAddressAsDefault, setAddressAsCurrent, removeAddress];

export const profileExtraReducers = (builder: ActionReducerMapBuilder<IProfileSliceState>) => {
  profileAsyncThunks.forEach(thunk => {
    builder.addCase(thunk.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(thunk.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(thunk.rejected, (state, action) => {
      if (axios.isAxiosError(state.error)) {
        state.error = state.error.response.data.error
      } else {
        state.error = "Some error occurred";
      }
      state.loading = false;
    })
  })

}
