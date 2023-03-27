import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { ConfirmationResult, UserCredential } from 'firebase/auth';
import OtpInput from 'react-otp-input';

import ArrowBack from 'assets/img/icons/arrow-back.svg';

import Button from 'shared/Button';
import InputError from 'components/FormElements/InputError';

import sendOTP from 'utils/sendOTP';

interface OTPFormProps extends React.HTMLAttributes<HTMLDivElement> {
  confirmationResult: ConfirmationResult;
  setConfirmationResult: React.Dispatch<
    React.SetStateAction<ConfirmationResult>
  >;
  verifyCallback: (result: UserCredential) => Promise<void>;
}

const OTPForm: React.FC<OTPFormProps> = ({
  confirmationResult,
  setConfirmationResult,
  verifyCallback,
}) => {
  const [countdownTime, setCountdownTime] = useState(60);
  const [otpSentTimes, setOtpSentTimes] = useState(1);

  const { control, handleSubmit, formState, setError } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const { errors, isSubmitting } = formState;

  const phoneNumber = location?.state?.phoneNumber;

  useEffect(() => {
    setCountdownTime(60);
    const intervalId = window.setInterval(() => {
      setCountdownTime((seconds) => {
        if (seconds === 1) {
          clearInterval(intervalId);
          return seconds - 1;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [otpSentTimes]);

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-[24rem]">
      <button
        className="bg-transparent self-start mb-10 md:mb-0"
        onClick={() => {
          setConfirmationResult(null);
          navigate(-1);
        }}
      >
        <ArrowBack aria-label="Back arrow icon" className="h-10" />
      </button>
      <div className="mt-auto mb-auto">
        <p className="text-[1.5rem] mb-10 text-slate-700">
          We have sent a 6-digit otp code on the phone number{' '}
          <b>{phoneNumber}</b>
        </p>
        <form
          aria-label="Form for otp input"
          onSubmit={handleSubmit(async ({ otp }) => {
            try {
              const result = await confirmationResult.confirm(otp);
              await verifyCallback(result);
            } catch (err: any) {
              setError('otp', { message: 'Some error occured' });
            }
          })}
          className="flex flex-col gap-y-4"
        >
          <p className="text-[1.4rem] text-slate-700">Enter the OTP</p>
          <InputError error={errors.otp as FieldError} />
          <Controller
            name="otp"
            control={control}
            rules={{
              required: 'Please enter the otp',
              minLength: { value: 6, message: 'OTP should be 6-digit long' },
            }}
            render={({ field: { onChange, value } }) => (
              <OtpInput
                value={value}
                onChange={onChange}
                numInputs={6}
                separator={<div className="flex justify-center"></div>}
                shouldAutoFocus
                containerStyle="w-[24rem] justify-between"
                focusStyle="border border-slate-700"
                inputStyle="!w-[3.5rem] h-[3.5rem] text-[1.6rem] outline-none"
              />
            )}
          />
          <Button loading={isSubmitting}>Verify OTP</Button>
        </form>
        <div className="text-[1.2rem] text-slate-700 mt-5">
          Didn't recieve code?{' '}
          {countdownTime === 0 ? (
            <button
              id="resend-otp-button"
              className="text-violet-600 hover:text-violet-700 hover:underline font-bold"
              onClick={async () => {
                try {
                  const confirmationResult = await sendOTP(
                    phoneNumber,
                    'resend-otp-button'
                  );
                  setConfirmationResult(confirmationResult);
                  setOtpSentTimes(otpSentTimes + 1);
                } catch (err: any) {
                  setError('otp', { message: 'Some error occured' });
                }
              }}
            >
              Resend
            </button>
          ) : (
            <>
              You can resend the otp in <b>{countdownTime}</b> seconds.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
