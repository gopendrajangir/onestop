import React, { useState } from 'react';
import cx from 'classnames';

import AddressForm from 'components/AddressForm';
import CartAddressItem from './CartAddressItem';

import { IAddress } from 'common/types';

import { useAppDispatch } from 'hooks/useAppDispatch';

import { addNewAddress } from 'redux/slices/profile/thunks';
import Button from 'shared/Button';
import { useAppSelector } from 'hooks/useAppSelector';
import Loader from 'shared/Loader';
import Hr from 'shared/Hr';

interface CartAddressSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  addresses: IAddress[];
  onDone: () => void;
}

const CartAddressSelector: React.FC<CartAddressSelectorProps> = ({
  className,
  addresses,
  onDone,
}) => {
  const loading = useAppSelector((state) => state.profile.loading);

  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div
      className={cx(
        className,
        'w-full bg-white rounded-md flex flex-col relative'
      )}
    >
      <h5 className="p-6 px-8">Change Delivery Address</h5>
      <Hr className="my-0" />
      {showForm && (
        <AddressForm
          onFormSubmit={async (data: IAddress) => {
            data.isCurrent = true;
            await dispatch(addNewAddress(data));
            setShowForm(false);
            onDone();
          }}
        />
      )}
      {!showForm && (
        <div className="flex flex-col gap-5 max-h-[35rem] overflow-auto p-10 pt-8">
          {addresses.map((address) => {
            return <CartAddressItem key={address._id} address={address} />;
          })}
          {
            <Button
              className="flex-shrink-0 min-w-[25rem]"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Add new address
            </Button>
          }
        </div>
      )}
      {loading && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white bg-opacity-25 rounded-md">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CartAddressSelector;
