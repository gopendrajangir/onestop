import React, { useState } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Logo from 'assets/img/logo.png';

import SearchBar from 'components/SearchBar';
import Menu from './Menu';

interface NavMobileProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavMobile: React.FC<NavMobileProps> = ({ className }) => {
  return (
    <nav
      className={cx(
        'lg:hidden z-50 px-10 h-28 w-full flex justify-between items-center text-md bg-white border-b',
        className
      )}
    >
      <NavLink to="/">
        <img className="w-16" src={Logo} alt="Website logo" />
      </NavLink>
      <SearchBar />
      <Menu />
    </nav>
  );
};

export default NavMobile;
