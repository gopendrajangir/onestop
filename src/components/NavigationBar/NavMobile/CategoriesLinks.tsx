import React, { useContext, useState } from 'react';
import cx from 'classnames';

import navData from '../navData';
import { navLinksContext } from './Menu';

interface CategoriesLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

const CategoriesLinks: React.FC<CategoriesLinksProps> = ({ className }) => {
  const { setShowModal, setNavIdx } = useContext(navLinksContext);

  return (
    <div className={cx(className, 'flex flex-col gap-10')}>
      {navData.map((navItem, i) => {
        return (
          <button
            key={navItem.title}
            onClick={() => {
              setShowModal(true);
              setNavIdx(i);
            }}
            className="hover:text-slate-600 uppercase h-full w-full text-xs px-4 flex justify-center items-center font-bold text-slate-700"
          >
            {navItem.title}
          </button>
        );
      })}
    </div>
  );
};

export default CategoriesLinks;
