import React from 'react';
import cx from 'classnames';
import { useAppSelector } from 'hooks/useAppSelector';
import Hr from 'shared/Hr';
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from 'react-router-dom';
import BasicInfoPage from './BasicInfoPage';
import EditProfilePage from './EditProfilePage';
import AddressesPage from './AddressesPage';

interface ProfilePageProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const profile = useAppSelector((state) => state.profile.profile);

  const { pathname } = useLocation();

  if (!profile) return null;

  const isActiveLink = (to) => {
    if (to === pathname) {
      return true;
    }
  };

  return (
    <div className={cx(className, 'p-16 md:p-24 lg:p-32 lg:px-80')}>
      <div className="">
        <h4 className="capitalize leading-tight">Account</h4>
        <span className="text-xs">{profile.name}</span>
      </div>
      <Hr className="mb-0" />
      <div className="flex flex-col md:flex-row">
        <div className="flex-row md:w-60 flex md:flex-col p-5 gap-5">
          <NavLink
            className={cx('text-sm capitalize active:text-orange-200', {
              'text-orange-400': isActiveLink('/auth/profile'),
            })}
            to=""
          >
            Basic
          </NavLink>
          <NavLink
            className={cx('text-sm capitalize active:text-orange-200', {
              'text-orange-400': isActiveLink('/auth/profile/edit'),
            })}
            to="edit"
          >
            Edit Profile
          </NavLink>
          <NavLink
            className={cx('text-sm capitalize active:text-orange-200', {
              'text-orange-400': isActiveLink('/auth/profile/addresses'),
            })}
            to="addresses"
          >
            Addresses
          </NavLink>
        </div>
        <div className="hidden md:block w-[1px] bg-slate-300"></div>
        <div className="flex-1 p-0 md:p-10">
          <div className="border p-0 md:p-5">
            <Routes>
              <Route index element={<BasicInfoPage profile={profile} />} />
              <Route
                path="edit"
                element={<EditProfilePage profile={profile} />}
              />
              <Route
                path="addresses"
                element={<AddressesPage addresses={profile.addresses} />}
              />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
