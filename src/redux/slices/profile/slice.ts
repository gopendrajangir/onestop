import { createSlice } from "@reduxjs/toolkit";
import { IProfile } from "common/types";

import { profileExtraReducers } from './extraReducers';

export interface IProfileSliceState {
  loading: boolean;
  profile?: IProfile;
  error?: string;
}

const initialState: IProfileSliceState = {
  loading: false
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    removeProfile: (state, action) => {
      state.profile = null;
    }
  },
  extraReducers: profileExtraReducers
})

export const { removeProfile } = profileSlice.actions;

export default profileSlice;