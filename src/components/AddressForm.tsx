import React, { useState } from 'react';
import cx from 'classnames';
import { FieldError, useForm } from 'react-hook-form';
import FormGroup from './FormElements/FormGroup';
import Label from './FormElements/Label';
import Input from './FormElements/Input';
import InputError from './FormElements/InputError';
import Button from 'shared/Button';
import { IAddress } from 'common/types';
import { useAppSelector } from 'hooks/useAppSelector';
import CheckLabel from './FormElements/CheckLabel';
import Hr from 'shared/Hr';

interface AddressFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onFormSubmit: (address: IAddress) => Promise<void>;
  defaultValues?: IAddress;
  title?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  className,
  onFormSubmit,
  defaultValues,
  title,
}) => {
  const [checkedDefault, setCheckedDefault] = useState<boolean>();

  const loading = useAppSelector((state) => state.profile.loading);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<IAddress>({
    defaultValues,
  });

  const checkAsDefault = checkedDefault ?? defaultValues?.isDefault ?? false;

  return (
    <form
      className={cx(
        className,
        'bg-white p-10 gap-y-5 flex flex-col w-[40rem] rounded'
      )}
      onSubmit={handleSubmit(async (data) => {
        await onFormSubmit(data);
      })}
    >
      {title && <h4 className="text-center mb-3">{title}</h4>}
      <FormGroup>
        <InputError error={errors.completeAddress as FieldError} />
        <Label>Complete Address*</Label>
        <Input
          disabled={loading}
          type="text"
          placeholder="House no. / Flat no. / Floor / Building"
          {...register('completeAddress', {
            required: 'Complete address is required',
            validate: (value) => {
              if (value.length < 10)
                return 'Complete address must be atleast 10 characters long';
              if (value.length > 256)
                return 'Complete address must be less than or equal to 256 characters';
            },
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputError error={errors.city as FieldError} />
        <Label>City*</Label>
        <Input
          type="text"
          disabled={loading}
          placeholder="City"
          {...register('city', {
            required: 'City is required',
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputError error={errors.pincode as FieldError} />
        <Label>Pincode*</Label>
        <Input
          type="text"
          disabled={loading}
          placeholder="Pincode"
          {...register('pincode', {
            required: 'Pincode is required',
            validate: (value) => {
              if (value.length < 6) return 'Pincode must be 6 digits long';
              if (value.length > 6) return 'Pincode must be 6 digits long';
            },
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputError error={errors.state as FieldError} />
        <Label>State*</Label>
        <Input
          type="text"
          disabled={loading}
          placeholder="State"
          {...register('state', {
            required: 'State is required',
          })}
        />
      </FormGroup>
      <FormGroup>
        <InputError error={errors.country as FieldError} />
        <Label>Country*</Label>
        <Input
          type="text"
          disabled={loading}
          placeholder="Country"
          {...register('country', {
            required: 'Country is required',
          })}
        />
      </FormGroup>
      <CheckLabel
        htmlFor="isDefault"
        checked={checkAsDefault}
        className="border p-4 text-xs text-violet-500"
      >
        Set as my default address
      </CheckLabel>
      <Input
        hidden
        id="isDefault"
        type="checkbox"
        {...register('isDefault', {
          onChange: (e) => {
            setCheckedDefault((e.target as HTMLInputElement).checked);
          },
        })}
      />
      <Button
        disabled={!isDirty}
        loading={loading}
        className="rounded-sm font-medium !text-xs disabled:bg-violet-400"
      >
        Save Address
      </Button>
    </form>
  );
};

export default AddressForm;
