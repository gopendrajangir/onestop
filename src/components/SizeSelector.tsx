import React, { useState } from 'react';
import cx from 'classnames';
import Button from 'shared/Button';
import ProductHeader from 'shared/ProductHeader';
import Hr from 'shared/Hr';
import Sizes from './Sizes';

interface SizeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onDone: (skuId: string) => void;
  product: any;
  skuId?: string;
  image: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  className,
  onDone,
  skuId,
  product,
  image,
}) => {
  const [newSkuId, setNewSkuId] = useState<string>();

  skuId = newSkuId ?? skuId;

  const {
    name,
    brand: { name: brandName },
    mrp,
    discount,
    skus,
  } = product;

  return (
    <div
      className={cx(
        className,
        'bg-white rounded px-16 py-16 flex flex-col max-w-2xl'
      )}
    >
      <ProductHeader
        mrp={mrp}
        name={name}
        brand={brandName}
        discount={discount}
        image={image}
        imageClass="!h-[9rem]"
      />
      <Hr className="my-8" />
      <h5 className="mb-8">Select Size</h5>
      <Sizes
        className="max-w-full"
        selectedSize={skuId}
        skus={skus}
        setSelectedSize={(_id) => {
          setNewSkuId(_id);
        }}
      />
      <Button onClick={() => onDone(skuId)} className="mt-10">
        Done
      </Button>
    </div>
  );
};

export default SizeSelector;
