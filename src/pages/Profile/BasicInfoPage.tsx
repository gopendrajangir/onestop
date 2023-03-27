import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Hr from 'shared/Hr';

import { IProfile } from 'common/types';

interface BasicInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: IProfile;
}

interface InfoValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: string;
}

const InfoValue: React.FC<InfoValueProps> = ({ value, className }) => {
  return (
    <span
      className={cx(
        'capitalize',
        {
          'text-slate-400': !value,
        },
        className
      )}
    >
      {value ? value : '--not-added--'}
    </span>
  );
};

const BasicInfo: React.FC<BasicInfoProps> = ({ className, profile }) => {
  const { name, phone, email, gender } = profile;

  return (
    <div className={cx(className, 'px-5 sm:px-10 py-5')}>
      <h4 className="capitalize leading-tight">Basic Info</h4>
      <Hr />
      <div className="flex flex-col items-center">
        <div className="text-center w-full grid-cols-[max-content,_max-content] sm:grid-cols-[100px,_max-content] grid md:grid-cols-2 justify-items-start text-sm gap-x-5 sm:gap-x-20 gap-y-5 py-10">
          <span>Full Name</span> <InfoValue value={name} />
          <span>Mobile Number</span> <InfoValue value={phone} />
          <span>Email ID</span>{' '}
          <InfoValue value={email} className="!normal-case" />
          <span>Gender</span> <InfoValue value={gender} />
        </div>
        <NavLink
          className="w-full bg-violet-500 text-center text-white py-5 font-bold"
          to="edit"
        >
          edit
        </NavLink>
      </div>
    </div>
  );
};

export default BasicInfo;
