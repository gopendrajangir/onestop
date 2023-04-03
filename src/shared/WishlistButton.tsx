import React, { useState } from 'react';
import cx from 'classnames';

import HeartOIcon from 'assets/img/icons/heart-o.svg';
import HeartIcon from 'assets/img/icons/heart.svg';

import { useAppSelector } from 'hooks/useAppSelector';

import Button, { ButtonProps } from './Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {
  addToWishlist,
  removeFromWishlist,
} from 'redux/slices/wishlist/thunks';

interface WishlistButtonProps extends ButtonProps {
  productId: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  className,
  productId,
  children,
  ...props
}) => {
  const wishlist = useAppSelector((state) => state.wishlist.wishlist);
  const loading = useAppSelector((state) => state.wishlist.loading);

  const [currentLoading, setCurrentLoading] = useState(false);

  const dispatch = useAppDispatch();

  const wishlisted =
    wishlist && wishlist.items.some(({ _id }) => _id === productId);

  const onClick = async () => {
    setCurrentLoading(true);
    if (wishlisted) {
      await dispatch(removeFromWishlist(productId));
    } else {
      await dispatch(addToWishlist(productId));
    }
    setCurrentLoading(false);
  };

  return (
    <Button
      onClick={onClick}
      className={cx(
        {
          'bg-slate-800 fill-violet-500 !text-slate-100 font-medium':
            wishlisted,
        },
        'text-sm font-medium h-20 px-6 rounded-md',
        className
      )}
      variant="outline"
      loading={currentLoading && loading}
      {...props}
    >
      {wishlisted ? (
        <>
          <HeartIcon className="w-6" />
          <span className="leading-none">WISHLISTED</span>
        </>
      ) : (
        <>
          <HeartOIcon className="w-6" />
          <span className="leading-none">WISHLIST</span>
        </>
      )}
    </Button>
  );
};

export default WishlistButton;
