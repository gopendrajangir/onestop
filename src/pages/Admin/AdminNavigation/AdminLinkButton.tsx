import React from 'react';
import { NavLink, NavLinkProps, Path } from 'react-router-dom';
import cx from 'classnames';

interface AdminLinkButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement> {}

const AdminLinkButton: React.FC<AdminLinkButtonProps & NavLinkProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={cx(
        'flex w-48 h-48 rounded-2xl justify-center items-center flex-col shadow-lg',
        className
      )}
    >
      {children}
    </NavLink>
  );
};

export default AdminLinkButton;
