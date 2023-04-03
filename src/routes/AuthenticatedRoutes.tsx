import React, { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

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
  const { isAuthenticated, isAuthenticating } = useContext(authContext);

  if (isAuthenticating) {
    return (
      <div className="h-[calc(100vh-7rem)]">
        <PageLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
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
