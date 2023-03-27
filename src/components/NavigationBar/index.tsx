import React from 'react';

import './nav.scss';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
};

export default NavigationBar;
