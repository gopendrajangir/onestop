import React from 'react';
import cx from 'classnames';

import { useAppSelector } from 'hooks/useAppSelector';

import Button from 'shared/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {
  addToWishlist,
  removeFromWishlist,
} from 'redux/slices/wishlist/thunks';
import WishlistButton from 'shared/WishlistButton';

interface SliderNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  activeIndex: number;
  productId: string;
}

const SliderNavigator: React.FC<SliderNavigatorProps> = ({
  className,
  count,
  activeIndex,
  productId,
}) => {
  return (
    <div
      className={cx(
        'w-full bg-white absolute bottom-0 hidden group-hover:flex flex-col pb-5',
        className
      )}
    >
      <div className="relative">
        <div className="w-full absolute bottom-0 bg-white flex justify-center items-center gap-x-2 pt-4 slide-up">
          {Array(count)
            .fill(0)
            .map((image, i) => {
              return (
                <div
                  key={i}
                  className={cx(
                    'w-[6px] aspect-square rounded-full border border-slate-300 flex-shrink-0 flex-grow-0',
                    {
                      'bg-violet-500 border-none': i === activeIndex,
                    }
                  )}
                ></div>
              );
            })}
        </div>
      </div>
      <WishlistButton productId={productId} className="mt-3" size="sm" />
    </div>
  );
};

export default SliderNavigator;
