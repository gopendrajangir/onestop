import React from 'react';
import cx from 'classnames';

interface MrpProps extends React.HTMLAttributes<HTMLDivElement> {
  mrp: number;
  discount?: {
    discountPercent?: number;
    label?: string;
  };
  size?: 'sm';
}

const Mrp: React.FC<MrpProps> = ({ className, mrp, discount, size }) => {
  return (
    <div
      className={cx('flex items-center flex-wrap gap-4', className, {
        '!text-sm': size === 'sm',
      })}
    >
      {discount && !!discount.discountPercent ? (
        <>
          <div className="flex items-end gap-x-1">
            <h5
              className={cx('text-3xl leading-none', {
                '!text-[100%]': size,
              })}
            >
              &#8377;
            </h5>
            <h5
              className={cx('text-2xl leading-none', {
                '!text-[100%]': size,
              })}
            >
              {Math.floor(mrp * (discount.discountPercent / 100))}
            </h5>
          </div>
          <div className="flex items-center gap-x-2 text-slate-500 font-light">
            <div
              className={cx('text-xl leading-none', {
                '!text-[100%]': size,
              })}
            >
              MRP
            </div>
            <div className="relative flex items-center">
              <span
                className={cx('text-xl leading-none', {
                  '!text-[100%]': size,
                })}
              >
                &#8377;
              </span>
              <span
                className={cx('text-lg leading-none', {
                  '!text-[100%]': size,
                })}
              >
                {mrp}
              </span>
              <div className="absolute h-0.5 w-full bg-slate-500"></div>
            </div>
          </div>
          <div
            className={cx('tracking-wide text-md font-bold text-orange-400', {
              '!text-[100%]': size,
            })}
          >
            {discount.label}
          </div>
        </>
      ) : (
        <>
          <h5 className="text-3xl leading-none">&#8377;</h5>
          <h5 className="text-2xl leading-none">{mrp}</h5>
        </>
      )}
    </div>
  );
};

export default Mrp;
