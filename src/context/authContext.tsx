import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';

import { auth } from 'utils/firebaseAuth';
import axios from 'axios';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchCart } from 'redux/slices/cart/thunks';
import { fetchWishlist } from 'redux/slices/wishlist/thunks';
import { fetchProfile } from 'redux/slices/profile/thunks';
import { removeCart } from 'redux/slices/cart/slice';
import { removeWishlist } from 'redux/slices/wishlist/slice';
import { removeProfile } from 'redux/slices/profile/slice';

interface AuthContextType {
  isAuthenticated: boolean;
}

const authDefualtValue: AuthContextType = {
  isAuthenticated: false,
};

const authContext = React.createContext<AuthContextType>(authDefualtValue);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + (await user.getIdToken());
        await dispatch(fetchProfile());
        await dispatch(fetchCart());
        await dispatch(fetchWishlist());
        setIsAuthenticated(true);
      } else {
        dispatch(removeCart(null));
        dispatch(removeWishlist(null));
        dispatch(removeProfile(null));
        setIsAuthenticated(false);
      }
    });
    onIdTokenChanged(auth, async () => {
      if (auth.currentUser) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + (await auth.currentUser.getIdToken());
      }
    });
  }, []);

  return (
    <authContext.Provider value={{ isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
