import React from 'react';
import cx from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';

import Logo from 'assets/img/logo.png';

import { useAppSelector } from 'hooks/useAppSelector';
import NavLinks from './NavLinks';
import SearchBar from 'components/SearchBar';
import Button from 'shared/Button';
import NavLoggedIn from './NavLoggedIn';

interface NavDesktopProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavDesktop: React.FC<NavDesktopProps> = ({ className }) => {
  const profile = useAppSelector((state) => state.profile.profile);

  const navigate = useNavigate();

  return (
    <nav
      className={cx(
        'hidden lg:flex px-10 h-28 w-full items-center text-md bg-white border-b',
        className
      )}
    >
      <NavLink to="/">
        <img className="w-16" src={Logo} alt="Website logo" />
      </NavLink>
      <NavLinks />
      <SearchBar className="mr-auto" />

      {!profile && (
        <Button
          className="capitalize leading-none rounded-sm"
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
    </nav>
  );
};

export default NavDesktop;
