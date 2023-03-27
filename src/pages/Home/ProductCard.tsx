import React from 'react';
import cx from 'classnames';
import Button from 'shared/Button';
import { useNavigate } from 'react-router-dom';
import ProgressiveImage from 'shared/ProgressiveImage';

import ArrowRight from 'assets/img/icons/arrow-right.svg';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  urlParams: URLSearchParams;
  img: string;
  title: string;
  discountLabel: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  className,
  title,
  urlParams,
  img,
  discountLabel,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate({
          pathname: '/search',
          search: '?' + urlParams,
        });
      }}
      className={cx(className, 'flex flex-col items-center rounded-md border')}
    >
      <ProgressiveImage
        className="w-full aspect-[3/4] object-cover"
        src={img}
        alt="shopping image"
      />
      <div className="flex flex-col justify-center items-center py-4 w-full gap-y-2">
        <h5 className="capitalize text-slate-800 drop-shadow">{title}</h5>
        <h5 className="capitalize text-amber-700 w-full">{discountLabel}</h5>
      </div>
    </button>
  );
};

export default ProductCard;
