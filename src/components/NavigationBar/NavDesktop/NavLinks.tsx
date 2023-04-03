import React, { useState } from 'react';
import cx from 'classnames';

import navData from '../navData';
import NavDropdown from './NavDropdown';

interface NavLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cx('ml-auto mr-auto flex gap-x-12 h-full', className)}>
      {navData.map((navItem) => {
        return <NavDropdown key={navItem.title} navItem={navItem} />;
      })}
    </div>
  );
};

export default NavLinks;
