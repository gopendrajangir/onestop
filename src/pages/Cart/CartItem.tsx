import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import ClearIcon from 'assets/img/icons/clear.svg';

import ProgressiveImage from 'shared/ProgressiveImage';
import CheckBox from 'shared/CheckBox';

import resizeImageUrl from 'utils/resizeImageUrl';

import { ICartItem } from 'common/types';
import {
  moveToWishlist,
  removeFromCart,
  selectItem,
  unSelectItem,
} from 'redux/slices/cart/thunks';
import { useAppDispatch } from 'hooks/useAppDispatch';
import SizeSelectorButton from './SizeSelectorButton';
import QuantitySelectorButton from './QuantitySelectorButton';
import Mrp from 'components/Mrp';
import Modal from 'shared/Modal';
import TextButton from 'shared/TextButton';
import ConfirmationModalContent from 'components/ConfirmationModalContent';

interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItem: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ className, cartItem }) => {
  const { product, sku, selected, quantity } = cartItem;
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const {
    name,
    brand: { name: brandName },
    media,
    skus,
    mrp,
    discount,
  } = product;

  const image = resizeImageUrl(media.albums[0].images[0].src, 240, null, 80);
  const skuId = sku._id;

  const dispatch = useAppDispatch();

  return (
    <>
      {showRemoveModal && (
        <Modal
          onClose={() => {
            setShowRemoveModal(false);
          }}
          closeButtonPosition="top-right"
          closeButtonClass="bg-transparent fill-slate-600 h-auto w-auto"
        >
          <ConfirmationModalContent
            image={image}
            heading="Move from Bag"
            description="Are you sure you want to move this item from bag?"
          >
            <div className="flex-1 flex justify-center">
              <TextButton
                onClick={() => {
                  dispatch(removeFromCart(skuId));
                  setShowRemoveModal(false);
                }}
              >
                Remove
              </TextButton>
            </div>
            <div className="h-10 w-[1px] bg-slate-300"></div>
            <div className="flex-1  flex justify-center">
              <TextButton
                variant="primary"
                onClick={() => {
                  dispatch(
                    moveToWishlist([{ productId: product._id, skuId: sku._id }])
                  );
                  setShowRemoveModal(false);
                }}
              >
                Move to wishlist
              </TextButton>
            </div>
          </ConfirmationModalContent>
        </Modal>
      )}
      <div
        className={cx(
          className,
          'relative border border-slate-300 flex gap-x-5 rounded'
        )}
      >
        <div className="relative">
          <NavLink to={`/product/${product._id}`}>
            <ProgressiveImage
              className="h-[13rem] aspect-[3/4]"
              src={image}
              alt="added product image"
            />
          </NavLink>
          <button
            className={cx('absolute top-3 left-3 ')}
            onClick={() => {
              if (selected) {
                dispatch(unSelectItem(skuId));
              } else {
                dispatch(selectItem(skuId));
              }
            }}
          >
            <CheckBox
              selected={selected}
              className="bg-slate-50 border-gray-500"
            />
          </button>
        </div>
        <div className="flex flex-col gap-y-2 py-2">
          <div className="text-sm font-medium">{brandName}</div>
          <div className="text-xs text-slate-600">{name}</div>
          <div className="flex gap-5 mt-2">
            <SizeSelectorButton image={image} product={product} sku={sku} />
            <QuantitySelectorButton
              skuId={sku._id}
              quantity={quantity}
              totalQuantity={sku.quantity}
            />
          </div>
          <Mrp mrp={mrp} discount={discount} size="sm" className="mt-2" />
        </div>
        <button
          onClick={() => {
            setShowRemoveModal(true);
          }}
          className="absolute top-3 right-3 fill-slate-500"
        >
          <ClearIcon className="w-9" />
        </button>
      </div>
    </>
  );
};

export default CartItem;
