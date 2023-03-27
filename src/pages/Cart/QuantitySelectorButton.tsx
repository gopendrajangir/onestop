import React, { useState } from 'react';
import cx from 'classnames';

import Modal from 'shared/Modal';
import DropButton from 'shared/DropButton';
import SelectorButton from 'shared/SelectorButton';
import Button from 'shared/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { changeQuantity } from 'redux/slices/cart/thunks';

interface QuantitySelectorButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  quantity: number;
  totalQuantity: number;
  skuId: string;
}

const QuantitySelectorButton: React.FC<QuantitySelectorButtonProps> = ({
  className,
  quantity,
  skuId,
  totalQuantity,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState<number>();

  const q = newQuantity ?? quantity;

  const dispatch = useAppDispatch();

  return (
    <div className={cx(className, '')}>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setNewQuantity(null);
          }}
        >
          <div
            className={cx(
              'bg-slate-50 border rounded px-16 py-8 flex flex-col items-center shadow-lg'
            )}
          >
            <h4 className="mb-8">Select Quantity</h4>
            <div className="max-w-xl flex flex-wrap gap-5 justify-center">
              {Array(totalQuantity >= 10 ? 10 : totalQuantity)
                .fill(0)
                .map((item, i) => {
                  return (
                    <SelectorButton
                      key={i}
                      text={`${i + 1}`}
                      selected={q === i + 1}
                      onClick={() => {
                        setNewQuantity(i + 1);
                      }}
                    />
                  );
                })}
            </div>
            <Button
              onClick={() => {
                dispatch(changeQuantity({ skuId, quantity: q }));
                setShowModal(false);
                setNewQuantity(null);
              }}
              className="mt-10 w-full"
            >
              Done
            </Button>
          </div>
        </Modal>
      )}
      <DropButton onClick={() => setShowModal(true)}>Quantity: {q}</DropButton>
    </div>
  );
};

export default QuantitySelectorButton;
