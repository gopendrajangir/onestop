import React from 'react';
import cx from 'classnames';

import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';

import BookmarkIcon from 'assets/img/icons/bookmark.svg';
import RightIcon from 'assets/img/icons/chevron-right.svg';

import { selectAllItems, unSelectAllItems } from 'redux/slices/cart/thunks';

import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import PageLoader from 'shared/PageLoader';
import CheckBox from 'shared/CheckBox';
import PlaceOrder from './PlaceOrder';
import MoveToWishlistButton from './MoveToWishlistButton';
import RemoveFromCartButton from './RemoveFromCartButton';
import CartAddress from './CartAddress';
import Button from 'shared/Button';
import { useNavigate } from 'react-router-dom';

interface CartProps extends React.HTMLAttributes<HTMLDivElement> {}

const Cart: React.FC<CartProps> = ({ className }) => {
  const cart = useAppSelector((state) => state.cart.cart);
  const loading = useAppSelector((state) => state.cart.loading);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (!cart) {
    return null;
  }

  const totalSelected = cart.items.filter(({ selected }) => selected).length;

  const selectedItems = cart.items.filter((item) => item.selected);

  if (!cart.items.length) return <EmptyCart />;

  return (
    <div className={cx(className, 'flex flex-1 justify-center')}>
      {loading && <PageLoader />}
      {!!cart.items.length && (
        <div className="flex gap-10 flex-col md:flex-row px-10 md:px-0">
          <div className="flex flex-col gap-y-6 mt-10 md:mt-0 md:py-10 md:min-h-full">
            <CartAddress className="" />
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    if (totalSelected > 0) {
                      dispatch(unSelectAllItems());
                    } else {
                      dispatch(selectAllItems());
                    }
                  }}
                >
                  <CheckBox
                    className="border-gray-500"
                    selected={totalSelected > 0}
                    partialSelected={
                      totalSelected > 0 && totalSelected < cart.items.length
                    }
                  />
                </button>
                <h5 className="leading-none">
                  {cart.items.filter(({ selected }) => selected).length}/
                  {cart.items.length} items selected
                </h5>
              </div>
              <div className="flex gap-8 items-center">
                <RemoveFromCartButton cartItems={selectedItems} />
                <div className="h-12 w-[1px] bg-slate-300"></div>
                <MoveToWishlistButton cartItems={selectedItems} />
              </div>
            </div>
            <div className="flex flex-col gap-y-7">
              {cart.items.map((cartItem) => {
                return (
                  <CartItem
                    className="max-w-[52rem] p-5"
                    key={cartItem._id}
                    cartItem={cartItem}
                  />
                );
              })}
            </div>
            <button
              onClick={() => {
                navigate('/auth/wishlist');
              }}
              className="border border-slate-500 hover:border-slate-600 rounded-md h-auto !text-xs capitalize p-5 flex justify-between fill-slate-600"
            >
              <div className="flex gap-x-2 items-center">
                <BookmarkIcon className="w-8" />{' '}
                <span className="leading-none">Add More From Wishlist</span>
              </div>
              <RightIcon className="w-8" />
            </button>
          </div>
          <div className="hidden md:block w-[1px] min-h-full flex-grow-0 bg-slate-300"></div>
          <PlaceOrder
            className="w-full md:w-[28rem] py-16"
            selectedItems={selectedItems}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
