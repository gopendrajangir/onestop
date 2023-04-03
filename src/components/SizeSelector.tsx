import React, { useState } from 'react';
import cx from 'classnames';
import Button from 'shared/Button';
import ProductHeader from 'shared/ProductHeader';
import Hr from 'shared/Hr';
import Sizes from './Sizes';
import AnimatedError from 'shared/AnimatedError';

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
  const [isTouched, setIsTouched] = useState(false);

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
      {!newSkuId && isTouched && (
        <AnimatedError className="mb-5" message="Please select a size" />
      )}
      <Sizes
        className="max-w-full"
        selectedSize={skuId}
        shake={!newSkuId && isTouched}
        skus={skus}
        setSelectedSize={(_id) => {
          setNewSkuId(_id);
        }}
      />
      <Button
        onClick={() => {
          if (skuId && !newSkuId) {
            onDone(skuId);
            return;
          }
          setIsTouched(true);
          if (newSkuId) {
            onDone(newSkuId);
          }
        }}
        className="mt-10"
      >
        Done
      </Button>
    </div>
  );
};

export default SizeSelector;
