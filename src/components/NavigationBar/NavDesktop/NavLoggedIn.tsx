import React, { useRef, useState } from 'react';
import { signOut } from 'firebase/auth';

import BagIcon from 'assets/img/icons/shopping-bag.svg';
import HeartOIcon from 'assets/img/icons/heart-o.svg';
import UserIcon from 'assets/img/icons/user.svg';

import { auth } from 'utils/firebaseAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';
import Hr from 'shared/Hr';

interface NavLoggedInProps extends React.HTMLAttributes<HTMLDivElement> {
  displayName: string;
  phoneNumber: string;
  photoURL?: string;
}

const NavLoggedIn: React.FC<NavLoggedInProps> = ({
  displayName,
  phoneNumber,
}) => {
  const cart = useAppSelector((state) => state.cart.cart);
  const wishlist = useAppSelector((state) => state.wishlist.wishlist);

  const navigate = useNavigate();

  return (
    <div className="flex gap-x-8 font-medium h-full">
      <div className="flex justify-center items-center gap-x-2 relative group px-4">
        <div className="hidden group-hover:block h-1.5 w-full bg-orange-500 absolute bottom-0"></div>
        <div className="flex flex-col items-center text-end text-slate-700 text-xs">
          <UserIcon className="w-6 mb-0.5 fill-slate-700" />
          <h6 className="text-xxs capitalize">Profile</h6>
        </div>
        <div className="hidden flex-col group-hover:flex w-96 bg-white border p-8 shadow-lg absolute top-full">
          <NavLink
            to="/auth/profile"
            className="normal-case flex flex-col mt-3 self-start"
          >
            {displayName && (
              <span className="font-bold leading-none">
                Hello {displayName.split(' ')[0]}
              </span>
            )}
            <span>{phoneNumber.split('+91')[1]}</span>
          </NavLink>
          <Hr className="my-5" />
          <button
            className="text-xs my-2"
            onClick={() => {
              signOut(auth);
              navigate('/');
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <NavLink
        to="/auth/wishlist"
        className="flex flex-col justify-center items-center h-full"
      >
        <div className="relative">
          <HeartOIcon className="w-6 mb-0.5 fill-slate-700" />
          {wishlist && !!wishlist.items.length && (
            <div className="absolute -top-5 -right-5  w-[1.7rem] h-[1.7rem] rounded-full font-medium bg-red-500 text-xxs text-white flex items-center justify-center">
              {wishlist.items.reduce((acc, item) => acc + 1, 0)}
            </div>
          )}
        </div>
        <h6 className="text-xxs capitalize">Wishlist</h6>
      </NavLink>
      <NavLink
        to="/auth/cart"
        className="flex flex-col justify-center items-center  h-full ml-4"
      >
        <div className="relative">
          <BagIcon className="w-6 mb-0.5 fill-slate-700" />
          {cart && !!cart.items.length && (
            <div className="absolute -top-5 -right-5  w-[1.7rem] h-[1.7rem] rounded-full font-medium bg-red-500 text-xxs text-white flex items-center justify-center">
              {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          )}
        </div>
        <h6 className="text-xxs capitalize">Bag</h6>
      </NavLink>
    </div>
  );
};

export default NavLoggedIn;
