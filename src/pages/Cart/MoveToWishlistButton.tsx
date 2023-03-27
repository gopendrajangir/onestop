import React, { useState } from 'react';
import cx from 'classnames';

import TextButton, { TextButtonProps } from 'shared/TextButton';

import { useAppDispatch } from 'hooks/useAppDispatch';

import { addToast } from 'redux/slices/toastSlice';
import { moveToWishlist } from 'redux/slices/cart/thunks';
import Modal from 'shared/Modal';
import ConfirmationModalContent from 'components/ConfirmationModalContent';
import { ICartItem } from 'common/types';

interface MoveToWishlistButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: ICartItem[];
}

const MoveToWishlistButton: React.FC<MoveToWishlistButtonProps> = ({
  className,
  cartItems,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className={cx(className, '')}>
      {showConfirmationModal && (
        <Modal
          onClose={() => {
            setShowConfirmationModal(false);
          }}
          closeButtonPosition="top-right"
          closeButtonClass="bg-transparent fill-slate-600 h-auto w-auto"
        >
          <ConfirmationModalContent
            heading="Move from Bag"
            description="Are you sure you want to move this item from bag?"
          >
            <div className="flex-1  flex justify-center">
              <TextButton onClick={() => setShowConfirmationModal(false)}>
                Cancel
              </TextButton>
            </div>
            <div className="h-10 w-[1px] bg-slate-300"></div>
            <div className="flex-1 flex justify-center">
              <TextButton
                variant="primary"
                onClick={() => {
                  dispatch(
                    moveToWishlist(
                      cartItems.map(({ sku, product }) => {
                        return { skuId: sku._id, productId: product._id };
                      })
                    )
                  );
                  setShowConfirmationModal(false);
                }}
              >
                Move To Wishlist
              </TextButton>
            </div>
          </ConfirmationModalContent>
        </Modal>
      )}
      <TextButton
        onClick={() => {
          if (cartItems.length < 1) {
            dispatch(
              addToast({
                message: 'Select any item to move to wishlist',
                status: 'success',
              })
            );
          } else {
            setShowConfirmationModal(true);
          }
        }}
      >
        Move To Wishlist
      </TextButton>
    </div>
  );
};

export default MoveToWishlistButton;
