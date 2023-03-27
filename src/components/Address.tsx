import React, { useState } from 'react';
import cx from 'classnames';

import EditIcon from 'assets/img/icons/edit.svg';
import RemoveIcon from 'assets/img/icons/trash.svg';

import { IAddress } from 'common/types';
import Modal from 'shared/Modal';
import AddressForm from './AddressForm';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { removeAddress, updateAddress } from 'redux/slices/profile/thunks';
import Button from 'shared/Button';
import ConfirmationModalContent from './ConfirmationModalContent';
import TextButton from 'shared/TextButton';

interface AddressProps extends React.HTMLAttributes<HTMLDivElement> {
  address: IAddress;
}

const Address: React.FC<AddressProps> = ({ className, address }) => {
  const [showForm, setShowForm] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  const dispatch = useAppDispatch();

  const { completeAddress, city, pincode, state, _id } = address;

  return (
    <div
      className={cx(
        className,
        'border p-8 text-xs text-slate-500 flex justify-between'
      )}
    >
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
          }}
          closeButtonClass="hidden"
        >
          <AddressForm
            defaultValues={address}
            title="Add new address"
            onFormSubmit={async (data) => {
              await dispatch(updateAddress({ address: data, addressId: _id }));
              setShowForm(false);
            }}
          />
        </Modal>
      )}
      {removeModal && (
        <Modal
          onClose={() => {
            setRemoveModal(false);
          }}
          closeButtonClass="hidden"
        >
          <ConfirmationModalContent
            heading="Remove Address"
            description="Are you sure you want to remove this address"
          >
            <div className="flex-1 flex justify-center items-center">
              <TextButton
                onClick={() => {
                  setRemoveModal(false);
                }}
              >
                Cancel
              </TextButton>
            </div>
            <div className="w-[1px] bg-slate-300"></div>
            <div className="flex-1 flex justify-center items-center">
              <TextButton
                variant="primary"
                onClick={() => {
                  dispatch(removeAddress(_id));
                }}
              >
                Remove
              </TextButton>
            </div>
          </ConfirmationModalContent>
        </Modal>
      )}
      <div>
        <div>{completeAddress}</div>
        <div>{city}</div>
        <div>{pincode}</div>
        <div>{state}</div>
      </div>
      <div className="flex gap-x-5 items-start">
        <button
          onClick={() => {
            setShowForm(true);
          }}
        >
          <EditIcon className="w-7" />
        </button>
        <button
          onClick={() => {
            setRemoveModal(true);
          }}
        >
          <RemoveIcon className="w-7" />
        </button>
      </div>
    </div>
  );
};

export default Address;
