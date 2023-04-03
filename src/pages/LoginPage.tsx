import React from 'react';

import FashionSignup from 'assets/img/fashion-signup.jpg';
import Login from 'components/Login';

interface LoginPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return (
    <div className="bg-slate-100 min-h-[calc(100vh-7rem)] flex justify-center items-start sm:items-center py-24">
      <div className="flex rounded-[0.5rem] overflow-hidden shadow-lg border">
        <div className="relative hidden md:flex justify-center items-center">
          <img
            className="w-[45rem] h-[45rem] object-cover grayscale-[0.2] bg-slate-200"
            src={FashionSignup}
            alt="Fashion image for login page"
          />
          <div className="w-full h-full absolute top-0 left-0 bg-violet-900 bg-opacity-10"></div>
          <div className="absolute p-20 pr-0 h-full">
            <h2 className="hidden md:block mb-10 text-[4.8rem] text-slate-50">
              Login / Signup
            </h2>
            <h5 className="text-slate-100 mr-20">
              "Fashion is the armor to survive the reality of everyday life"
            </h5>
            <h2 className="text-[1.4rem] mt-6 text-slate-100">
              ~Bill Cunningham
            </h2>
          </div>
        </div>
        <div className="p-20 flex flex-col justify-center bg-white">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
