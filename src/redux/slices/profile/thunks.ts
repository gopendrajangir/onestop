import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

import { IAddress, IProfile } from "common/types";

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

export const fetchProfile = createAsyncThunk<IProfile, never>('profile/fetchProfile', async (arg, { dispatch }) => {
  try {
    const response = await axios.get('/users/me')

    const { user } = response.data

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }

})

export const updateProfile = createAsyncThunk<IProfile, Partial<IProfile>>('profile/updateProfile', async (data, { dispatch }) => {
  try {
    const response = await axios.patch('/users/me', data);

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Profile updated successfully",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})


export const addNewAddress = createAsyncThunk<IProfile, IAddress>('profile/addNewAddress', async (address, { dispatch }) => {
  try {


    const response = await axios.post('/users/addresses', {
      address
    });

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Address added successfully",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})

export const updateAddress = createAsyncThunk<IProfile, { address: Partial<IAddress>, addressId: string }>('profile/updateAddress', async ({ address, addressId }, { dispatch }) => {
  try {
    const response = await axios.put(`/users/addresses/${addressId}`, { address });

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Address updated successfully",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})

export const removeAddress = createAsyncThunk<IProfile, string>('profile/removeAddress', async (addressId, { dispatch }) => {
  try {
    const response = await axios.delete(`/users/addresses/${addressId}`);

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Address deleted successfully",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})

export const setAddressAsDefault = createAsyncThunk<IProfile, { address: Partial<IAddress>, addressId: string }>('profile/setAddressAsDefault', async ({ address, addressId }, { dispatch }) => {
  try {
    const response = await axios.patch(`/users/addresses/${addressId}/setAsDefault`, { address });

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Address set as default successfully",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})

export const setAddressAsCurrent = createAsyncThunk<IProfile, string>('profile/setAddressAsCurrent', async (addressId, { dispatch }) => {
  try {
    const response = await axios.patch(`/users/addresses/${addressId}/setAsCurrent`);

    const { user } = response.data

    dispatch({
      type: 'toast/addToast', payload: {
        message: "Address changed",
        status: 'success'
      }
    })

    return user;
  } catch (err) {
    errorToastDispatcher(err, dispatch);
  }
})