import React, { useState } from 'react';
import cx from 'classnames';

import Modal from 'shared/Modal';
import DropButton from 'shared/DropButton';
import Sizes from 'components/Sizes';

import { IDiscount, ISku } from 'common/types';
import ProductHeader from 'shared/ProductHeader';
import Hr from 'shared/Hr';
import Button from 'shared/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { changeSku } from 'redux/slices/cart/thunks';
import SizeSelector from 'components/SizeSelector';

interface SizeSelectorButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  sku: ISku;
  product: any;
  image: string;
}

const SizeSelectorButton: React.FC<SizeSelectorButtonProps> = ({
  className,
  product,
  sku,
  image,
}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className={cx(className, '')}>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <SizeSelector
            product={product}
            skuId={sku._id}
            image={image}
            onDone={(skuId) => {
              dispatch(changeSku({ skuId: sku._id, newSkuId: skuId }));
              setShowModal(false);
            }}
          />
        </Modal>
      )}
      <DropButton onClick={() => setShowModal(true)}>
        Size: {sku.size}
      </DropButton>
    </div>
  );
};

export default SizeSelectorButton;
