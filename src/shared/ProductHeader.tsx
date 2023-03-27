import React from 'react';
import cx from 'classnames';

import ProgressiveImage from './ProgressiveImage';
import Mrp from 'components/Mrp';

interface ProductHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
  brand: string;
  imageClass?: string;
  brandClass?: string;
  nameClass?: string;
  mrp: number;
  discount?: {
    discountPercent?: number;
    label?: string;
  };
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  className,
  image,
  brand,
  name,
  imageClass = '',
  brandClass = '',
  nameClass = '',
  discount,
  mrp,
}) => {
  return (
    <div className={cx(className, 'flex gap-5')}>
      <ProgressiveImage
        className={cx('h-[13rem] aspect-[3/4]', imageClass)}
        src={image}
        alt="added product image"
      />
      <div className="flex flex-col gap-2">
        <div className={cx('text-sm font-medium', brandClass)}>{brand}</div>
        <div className={cx('text-xs text-slate-600', nameClass)}>{name}</div>
        <Mrp mrp={mrp} discount={discount} size="sm" />
      </div>
    </div>
  );
};

export default ProductHeader;
