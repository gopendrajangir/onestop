import React from 'react';
import cx from 'classnames';
import { useAppSelector } from 'hooks/useAppSelector';

import PageLoader from 'shared/PageLoader';
import WishlistItem from './WishlistItem';

interface WishlistPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const WishlistPage: React.FC<WishlistPageProps> = ({ className }) => {
  const wishlist = useAppSelector((state) => state.wishlist.wishlist);
  const loading = useAppSelector((state) => state.wishlist.loading);

  return (
    <div className={cx(className, 'md:p-40 py-20 p-10')}>
      {loading && <PageLoader />}
      {wishlist && (
        <div>
          <div className="flex mb-10 text-xl gap-3">
            <span className="font-medium">My Wishlist </span>
            <span className="text-slate-500">
              - {wishlist.items.length} items
            </span>
          </div>
          <div
            className={cx(
              className,
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'
            )}
          >
            {wishlist.items.map((item) => {
              return <WishlistItem key={item._id} product={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
