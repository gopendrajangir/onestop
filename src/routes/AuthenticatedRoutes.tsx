import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import CartPage from 'pages/Cart';
import PageLoader from 'shared/PageLoader';
import WishlistPage from 'pages/Wishlist';
import ProfilePage from 'pages/Profile';

import { authContext } from 'context/authContext';
import { useAppSelector } from 'hooks/useAppSelector';

interface AuthenticatedRoutesProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({
  className,
}) => {
  const profile = useAppSelector((state) => state.profile.profile);

  if (!profile && profile !== null) {
    return <PageLoader />;
  }

  if (profile === null) {
    return null;
  }

  return (
    <Routes>
      <Route path="cart" element={<CartPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="profile/*" element={<ProfilePage />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
