import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { ConfirmationResult } from 'firebase/auth';

import InputError from 'components/FormElements/InputError';
import PhoneInput from 'components/FormElements/PhoneInput';
import Button from 'shared/Button';
import sendOTP from 'utils/sendOTP';

interface SignupProps extends React.HTMLAttributes<HTMLDivElement> {
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<ConfirmationResult>
  >;
  confirmationResult: ConfirmationResult;
}

const Signup: React.FC<SignupProps> = ({
  setConfirmationResult,
  confirmationResult,
}) => {
  const { register, setValue, handleSubmit, formState } = useForm();
  const [phoneNumber, setPhoneNumber] = useState();

  const { errors, isSubmitting } = formState;

  if (confirmationResult) {
    return <Navigate to="/login/otp" state={{ phoneNumber }} />;
  }

  return (
    <form
      aria-label="Signup form"
      className="flex flex-col gap-y-5"
      onSubmit={handleSubmit(async ({ phone }) => {
        phone = '+91' + phone;
        setPhoneNumber(phone);
        try {
          const confirmationResult = await sendOTP(phone, 'signup-form-button');
          setConfirmationResult(confirmationResult);
        } catch (err: any) {
          console.log(err.message);
          // setError('phone', { message: 'Some error occured' });
        }
      })}
    >
      <h2 className="block md:hidden mb-10 text-[3rem] text-slate-500">
        Login / Signup
      </h2>
      <div>
        <InputError error={errors.phone} />
        <PhoneInput
          error={errors.phone}
          placeholder="Phone number"
          {...register('phone', {
            required: 'Please provide a phone number',
            minLength: {
              value: 10,
              message: 'Phone number should be 10 digits long',
            },
            onChange: ({ currentTarget: { value } }) => {
              setValue('phone', value.replace(/[^0-9]/g, ''));
            },
          })}
        />
      </div>
      <Button
        className="!text-xs capitalize rounded-sm"
        id="signup-form-button"
        loading={isSubmitting}
      >
        Signup / Login
      </Button>
    </form>
  );
};

export default Signup;
