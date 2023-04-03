import React from 'react';
import cx from 'classnames';
import { IAddress } from 'common/types';
import CheckBox from 'shared/CheckBox';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setAddressAsCurrent } from 'redux/slices/profile/thunks';

interface CartAddressItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  address: IAddress;
}

const CartAddressItem: React.FC<CartAddressItemProps> = ({
  className,
  address,
}) => {
  const dispatch = useAppDispatch();

  const { _id, completeAddress, city, pincode, state, isCurrent } = address;
  return (
    <button
      onClick={() => {
        if (!isCurrent) {
          dispatch(setAddressAsCurrent(_id));
        }
      }}
      className={cx(
        className,
        'flex text-start gap-x-3 min-w-0 max-w-[35rem] text-xs border border-slate-300 p-5 hover:bg-slate-50'
      )}
    >
      <div className="pt-1">
        <CheckBox selected={isCurrent} isRadio />
      </div>
      <div>
        <div>{completeAddress}</div>
        <div>{city}</div>
        <div>{pincode}</div>
        <div>{state}</div>
      </div>
    </button>
  );
};

export default CartAddressItem;
