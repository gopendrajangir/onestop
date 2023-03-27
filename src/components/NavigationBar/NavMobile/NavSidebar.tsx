import React, { useContext } from 'react';
import cx from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';

import MenuIcon from 'assets/img/icons/menu.svg';
import Logo from 'assets/img/logo.png';
import CategoriesLinks from './CategoriesLinks';
import Hr from 'shared/Hr';
import { useAppSelector } from 'hooks/useAppSelector';
import Button from 'shared/Button';
import NavLoggedIn from './NavLoggedIn';
import { navLinksContext } from './Menu';

interface NavSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  close: () => void;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ className, close }) => {
  const profile = useAppSelector((state) => state.profile.profile);

  const navigate = useNavigate();

  return (
    <div
      className={cx(
        className,
        'fixed top-0 right-0 w-[24rem] bg-slate-50 flex flex-col shadow-lg h-screen border-l border-l-slate-200'
      )}
    >
      <div className="h-[7rem] flex items-center justify-between px-8 border-b">
        <NavLink to="/">
          <img className="w-14" src={Logo} alt="Website logo" />
        </NavLink>
        <button onClick={() => close()}>
          <MenuIcon className="w-8" />
        </button>
      </div>
      <CategoriesLinks className="mt-10" />
      <Hr className="mt-10" />
      <div className="p-8">
        {!profile && (
          <Button
            className="capitalize leading-none rounded-md w-full"
            onClick={() => {
              navigate('/login');
            }}
            size="sm"
            variant="primary"
          >
            Login | Signup
          </Button>
        )}
        {profile && (
          <NavLoggedIn displayName={profile.name} phoneNumber={profile.phone} />
        )}
      </div>
    </div>
  );
};

export default NavSidebar;
