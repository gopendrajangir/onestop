import React from 'react';
import cx from 'classnames';
import { ISku } from 'common/types';

import './sizes.scss';
import SelectorButton from 'shared/SelectorButton';

interface SizesProps extends React.HTMLAttributes<HTMLDivElement> {
  skus: ISku[];
  selectedSize: string;
  setSelectedSize: (_id: string) => void;
  shake?: boolean;
}

const Sizes: React.FC<SizesProps> = ({
  className,
  shake,
  skus,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div
      className={cx('flex flex-wrap gap-5', className, {
        shake: shake,
      })}
    >
      {[...skus]
        .sort((a, b) => a.priority - b.priority)
        .map(({ size, skuId, _id }) => {
          return (
            <SelectorButton
              key={skuId}
              onClick={() => setSelectedSize(_id)}
              selected={selectedSize === _id}
              text={size}
              className={cx()}
            />
          );
        })}
    </div>
  );
};

export default Sizes;
