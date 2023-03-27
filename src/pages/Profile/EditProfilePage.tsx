import React from 'react';
import cx from 'classnames';

import VerifyIcon from 'assets/img/icons/verified.svg';

import Hr from 'shared/Hr';
import EditProfileForm from 'components/EditProfileForm';

import { IProfile } from 'common/types';

interface EditProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: IProfile;
}

const EditProfile: React.FC<EditProfileProps> = ({ className, profile }) => {
  const { phone } = profile;

  return (
    <div className={cx(className, 'px-10 py-5')}>
      <h4 className="capitalize leading-tight">Edit Profile</h4>
      <Hr />
      <div>
        <div className="border p-5">
          <span className="text-slate-500">Mobile Number*</span>
          <div className="flex items-center gap-x-1">
            <span className="text-xs">{phone}</span>
            <VerifyIcon className="w-8 fill-green-500 mb-0.5" />
          </div>
        </div>
        <EditProfileForm className="mt-5" profile={profile} />
      </div>
    </div>
  );
};

export default EditProfile;
