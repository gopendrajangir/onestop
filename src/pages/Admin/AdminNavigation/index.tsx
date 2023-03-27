import React from 'react';
import cx from 'classnames';

import AdminLinkButton from './AdminLinkButton';

interface AdminNavigationProps extends React.HTMLAttributes<HTMLDivElement> {}

const AdminNavigation: React.FC<AdminNavigationProps> = (props) => {
  const links = [
    {
      to: 'create-product',
      className: 'bg-violet-400',
      sign: '+',
      text: 'Create new product',
    },
    {
      to: 'create-sku',
      className: 'bg-slate-700',
      sign: '+',
      text: 'Create new sku',
    },
  ];

  return (
    <div className="p-10 px-20 flex gap-x-8">
      {links.map(({ to, className, sign, text }) => {
        return (
          <AdminLinkButton key={to} to={to} className={cx(className, 'px-4')}>
            <span className="text-white text-[2.4rem]">{sign}</span>
            <span className="text-white text-[1.4rem] capitalize text-center">
              {text}
            </span>
          </AdminLinkButton>
        );
      })}
    </div>
  );
};

export default AdminNavigation;
