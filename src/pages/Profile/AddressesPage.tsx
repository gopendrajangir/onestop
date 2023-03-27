import React, { useState } from 'react';
import cx from 'classnames';

import Hr from 'shared/Hr';
import Button from 'shared/Button';

import { IAddress } from 'common/types';
import Modal from 'shared/Modal';
import AddressForm from 'components/AddressForm';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { addNewAddress } from 'redux/slices/profile/thunks';
import Address from 'components/Address';

import categorizeAddresses from 'utils/categorizeAddresses';

interface AddressesProps extends React.HTMLAttributes<HTMLDivElement> {
  addresses: IAddress[];
}

const Addresses: React.FC<AddressesProps> = ({ className, addresses }) => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useAppDispatch();

  const { defaultAddress, otherAddresses } = categorizeAddresses(addresses);

  return (
    <div className={cx(className, 'px-10 py-5')}>
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
          }}
          closeButtonClass="hidden"
        >
          <AddressForm
            title="Add new address"
            onFormSubmit={async (data) => {
              await dispatch(addNewAddress(data)).then();
              setShowForm(false);
            }}
          />
        </Modal>
      )}
      <div className="flex justify-between items-center">
        <h4 className="capitalize leading-tight">Saved Addresses</h4>
        {addresses.length && (
          <Button onClick={() => setShowForm(true)} size="sm">
            Add New Address
          </Button>
        )}
      </div>
      <Hr />
      <div className="flex flex-col gap-y-5 h-[32rem] overflow-y-auto">
        {!addresses.length && (
          <div className="h-80 flex flex-col justify-center items-center gap-y-5">
            <h5 className="normal-case">You have not provided any address</h5>
            <Button onClick={() => setShowForm(true)}>Add New Address</Button>
          </div>
        )}
        {!!addresses.length && (
          <div className="flex flex-col gap-y-5">
            {defaultAddress && (
              <div className="flex flex-col gap-y-5">
                <h6>Default Address</h6>
                <div>
                  <Address address={defaultAddress} />
                </div>
              </div>
            )}
            {!!otherAddresses.length && (
              <div className="flex flex-col gap-y-5">
                <h6>Other Addresses</h6>
                <div className="flex flex-col gap-y-5">
                  {otherAddresses.map((address) => {
                    return <Address address={address} />;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
