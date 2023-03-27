import React, { useState } from 'react';
import cx from 'classnames';

import ClearIcon from 'assets/img/icons/clear.svg';

import resizeImageUrl from 'utils/resizeImageUrl';
import ProgressiveImage from 'shared/ProgressiveImage';
import Mrp from 'components/Mrp';
import Hr from 'shared/Hr';
import TextButton from 'shared/TextButton';
import Modal from 'shared/Modal';
import SizeSelector from 'components/SizeSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { moveToCart, removeFromWishlist } from 'redux/slices/wishlist/thunks';
import { NavLink } from 'react-router-dom';

interface WishlistItemProps extends React.HTMLAttributes<HTMLDivElement> {
  product: any;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ className, product }) => {
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const dispatch = useAppDispatch();

  const {
    name,
    brand: { name: brandName },
    media,
    skus,
    mrp,
    discount,
  } = product;

  const image = resizeImageUrl(media.albums[0].images[0].src, 240, null, 80);

  return (
    <div className={cx(className, 'w-full border border-slate-300 relative')}>
      {showSizeSelector && (
        <Modal
          onClose={() => {
            setShowSizeSelector(false);
          }}
        >
          <SizeSelector
            onDone={(skuId) => {
              dispatch(moveToCart({ productId: product._id, skuId }));
              setShowSizeSelector(false);
            }}
            image={image}
            product={product}
          />
        </Modal>
      )}
      <NavLink
        to={`/product/${product._id}`}
        className="w-full hidden sm:inline-block"
      >
        <ProgressiveImage
          className="w-full aspect-[3/4]"
          src={image}
          alt="wishlist product image"
        />
      </NavLink>
      <NavLink to={`/product/${product._id}`} className="w-full sm:hidden">
        {
          <ProgressiveImage
            className="w-full aspect-[3/4]"
            src={resizeImageUrl(media.albums[0].images[0].src, 400, null, 80)}
            alt="wishlist product image"
          />
        }
      </NavLink>
      <div className="p-5 pb-0 flex flex-col gap-y-2">
        <p className="text-sm truncate">{name}</p>
        <Mrp mrp={mrp} discount={discount} size="sm" />
      </div>
      <Hr />
      <div className="text-center pb-5">
        <TextButton
          onClick={() => {
            setShowSizeSelector(true);
          }}
          variant="primary"
        >
          Move To Bag
        </TextButton>
      </div>
      <button
        onClick={() => {
          dispatch(removeFromWishlist(product._id));
        }}
        className={cx(
          'z-10 absolute top-3 right-3 w-12 h-12 fill-white rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center'
        )}
      >
        <ClearIcon className="w-8 h-8 fill-inherit" />
      </button>
    </div>
  );
};

export default WishlistItem;
