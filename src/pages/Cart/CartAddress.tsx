import React, { useState } from 'react';
import cx from 'classnames';

import LocationCityIcon from 'assets/img/icons/location_city.svg';

import { useAppSelector } from 'hooks/useAppSelector';

import categorizeAddresses from 'utils/categorizeAddresses';

import Button from 'shared/Button';
import Modal from 'shared/Modal';
import CartAddressSelector from 'components/CartAddressSelector';

interface CartAddressProps extends React.HTMLAttributes<HTMLDivElement> {}

const CartAddress: React.FC<CartAddressProps> = ({ className }) => {
  const [showAddressSelector, setShowAddressSelector] = useState(false);

  const profile = useAppSelector((state) => state.profile.profile);

  if (!profile) return null;

  const { currentAddress, defaultAddress, otherAddresses } =
    categorizeAddresses(profile.addresses);

  const selectedAddress = currentAddress ?? defaultAddress;

  return (
    <div className={cx(className)}>
      {showAddressSelector && (
        <Modal
          onClose={() => {
            setShowAddressSelector(false);
          }}
          closeButtonClass="bg-transparent fill-slate-700 !p-0"
          closeButtonIconClass="!w-10 !h-10"
          closeButtonPosition="top-right"
        >
          <CartAddressSelector
            onDone={() => {
              setShowAddressSelector(false);
            }}
            addresses={profile.addresses}
          />
        </Modal>
      )}
      {!selectedAddress && (
        <div className="border border-slate-300 p-5 flex items-center justify-between">
          <div className="flex gap-x-5 items-center">
            <LocationCityIcon className="w-10 fill-slate-500" />
            <h6 className="text-slate-500">Delivery Address</h6>
          </div>
          <Button
            size="xs"
            color="primary"
            variant="outline"
            onClick={() => {
              setShowAddressSelector(true);
            }}
          >
            Select Address
          </Button>
        </div>
      )}
      {selectedAddress && (
        <div className="flex text-[1.1rem] w-full justify-between items-center border border-slate-300 p-5 text-slate-500">
          <div className="flex flex-1 flex-col w-full min-w-0 gap-y-1">
            <div>
              Deliver to:{' '}
              <b className="text-slate-600">
                {profile.name}, {selectedAddress.pincode}
              </b>
            </div>
            <div className="truncate w-full min-w-0 max-w-full">
              {selectedAddress.completeAddress}
            </div>
          </div>
          <div className="">
            <Button
              size="xs"
              color="primary"
              variant="outline"
              className="w-max"
              onClick={() => {
                setShowAddressSelector(true);
              }}
            >
              Change Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartAddress;
