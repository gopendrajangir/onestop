import React from 'react';
import cx from 'classnames';

import { ICartItem } from 'common/types';
import calculateOrderAnalytics from 'utils/calculateOrderAnalytics';
import Hr from 'shared/Hr';
import Button from 'shared/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { addToast } from 'redux/slices/toastSlice';

interface PLaceOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedItems: ICartItem[];
}

const PLaceOrder: React.FC<PLaceOrderProps> = ({
  className,
  selectedItems,
}) => {
  const dispatch = useAppDispatch();

  let analytics;

  if (selectedItems.length) analytics = calculateOrderAnalytics(selectedItems);
  else analytics = { totalDiscount: 0, totalMrp: 0 };

  return (
    <div className={cx(className, 'flex flex-col')}>
      <h6 className="text-slate-600">
        Price Details ({selectedItems.length} item
        {selectedItems.length > 1 ? 's' : ''})
      </h6>
      <div className="mt-5 flex flex-col gap-y-5">
        <div className="flex justify-between text-xs">
          <span>Total MRP</span>
          <span>&#8377;{analytics.totalMrp}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Discount on MRP</span>
          <span className="text-green-500">
            -&#8377;{analytics.totalDiscount}
          </span>
        </div>
        <Hr className="my-1" />
        <div className="font-medium text-sm flex justify-between">
          <span>Total Amount</span>
          <span>&#8377;{analytics.totalMrp - analytics.totalDiscount}</span>
        </div>
        <Button
          onClick={() => {
            if (selectedItems.length < 1) {
              dispatch(
                addToast({
                  status: 'success',
                  message: 'Select atleast one item in bag to place order',
                })
              );
            } else {
              dispatch(
                addToast({
                  status: 'success',
                  message: 'Website under construction',
                })
              );
            }
          }}
          className="rounded-none font-medium !text-xs"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default PLaceOrder;
