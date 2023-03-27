import React, { useRef, useState } from 'react';
import { signOut } from 'firebase/auth';

import BagIcon from 'assets/img/icons/shopping-bag.svg';
import HeartOIcon from 'assets/img/icons/heart-o.svg';
import UserIcon from 'assets/img/icons/user.svg';

import { auth } from 'utils/firebaseAuth';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';
import Hr from 'shared/Hr';
import Button from 'shared/Button';

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

  return (
    <div className="flex flex-col w-full gap-8 font-medium uppercase text-sm">
      <NavLink to="/auth/wishlist" className="flex items-center gap-x-5">
        <div className="relative">
          <HeartOIcon className="w-6 mb-0.5 fill-slate-700" />
        </div>
        <h6>Wishlist</h6>
        {wishlist && !!wishlist.items.length && (
          <div className="ml-auto w-[1.7rem] h-[1.7rem] rounded-full font-medium bg-red-500 text-xxs text-white flex items-center justify-center">
            {wishlist.items.reduce((acc, item) => acc + 1, 0)}
          </div>
        )}
      </NavLink>
      <NavLink to="/auth/cart" className="flex items-center gap-x-5">
        <BagIcon className="w-6 mb-0.5 fill-slate-700" />
        <h6>Bag</h6>
        {cart && !!cart.items.length && (
          <div className="ml-auto w-[1.7rem] h-[1.7rem] rounded-full font-medium bg-red-500 text-xxs text-white flex items-center justify-center">
            {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
        )}
      </NavLink>
      <div className="flex gap-x-5">
        <UserIcon className="w-8 mb-0.5 fill-slate-700" />
        <div className="flex flex-col">
          <NavLink
            to="/auth/profile"
            className="normal-case flex flex-col mt-3 self-start"
          >
            <span className="font-bold leading-none">
              Hello {displayName.split(' ')[0]}
            </span>
            <span>{phoneNumber.split('+91')[1]}</span>
          </NavLink>
        </div>
      </div>
      <Button
        className="rounded-md"
        onClick={() => {
          signOut(auth);
        }}
        size="xs"
      >
        Log out
      </Button>
    </div>
  );
};

export default NavLoggedIn;
