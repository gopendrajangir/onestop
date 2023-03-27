import React from 'react';
import cx from 'classnames';
import Button from 'shared/Button';
import { useNavigate } from 'react-router-dom';

import ArrowRight from 'assets/img/icons/arrow-right.svg';

interface SaleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  urlParams: URLSearchParams;
  img: string;
  title: string;
  discountLabel: string;
}

const SaleCard: React.FC<SaleCardProps> = ({
  className,
  title,
  urlParams,
  img,
  discountLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cx(className, 'flex gap-5 justify-between rounded-md px-10')}
    >
      <div className="flex flex-col justify-center items-start">
        <span className="text-[1.1rem] uppercase text-orange-500 font-medium">
          {discountLabel}
        </span>
        <span className="mt-1 leading-tight w-max text-md font-medium capitalize text-slate-800">
          {title}
        </span>
        <Button
          onClick={() => {
            navigate({
              pathname: '/search',
              search: '?' + urlParams,
            });
          }}
          size="xs"
          className="bg-slate-50 !text-slate-600 font-medium mt-4 rounded-full px-7"
        >
          <span className="leading-none mt-[1px]">Shop Now</span>
        </Button>
      </div>
      <div className="h-full flex items-center">
        <img className="min-w-0 w-32" src={img} alt="shopping image" />
      </div>
    </div>
  );
};

export default SaleCard;
