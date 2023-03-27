import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import PhoneSignup from './PhoneAuth';
import OTPForm from 'components/OTPForm';
import { ConfirmationResult, UserCredential } from 'firebase/auth';
import PageNotFound from 'pages/PageNotFound';

interface SignupProps extends React.HTMLAttributes<HTMLDivElement> {}

const Signup: React.FC<SignupProps> = (props) => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const navigate = useNavigate();

  const verifyCallback = async (result: UserCredential) => {
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <PhoneSignup
            confirmationResult={confirmationResult}
            setConfirmationResult={setConfirmationResult}
          />
        }
      />
      <Route
        path="otp"
        element={
          <OTPForm
            confirmationResult={confirmationResult}
            setConfirmationResult={setConfirmationResult}
            verifyCallback={verifyCallback}
          />
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Signup;
