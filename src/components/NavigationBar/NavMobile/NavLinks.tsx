import React, { useContext } from 'react';
import cx from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { navLinksContext } from './Menu';

interface NavLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  navItem: any;
}

const NavLinks: React.FC<NavLinksProps> = ({ className, navItem }) => {
  const { setShowModal, closeSidebar } = useContext(navLinksContext);

  const navigate = useNavigate();

  return (
    <div
      className={cx('flex gap-x-12 overflow-x-auto w-full h-full ', className)}
    >
      {navItem.groups.map((group, i) => {
        return (
          <div className="flex flex-col gap-y-7 even:bg-slate-50 p-10" key={i}>
            {group.map((subgroup, i) => {
              return (
                <div
                  key={i}
                  className={cx('flex flex-col gap-y-3 w-[18rem]', {
                    'border-b pb-7 border-b-slate-200': i != group.length - 1,
                  })}
                >
                  <NavLink
                    className={cx(
                      'capitalize font-medium text-[1.3rem]',
                      navItem.textColor
                    )}
                    to={subgroup.link}
                  >
                    {subgroup.type}
                  </NavLink>

                  {!!subgroup.items.length && (
                    <ul className="flex flex-col pl-1 gap-y-0.5">
                      {subgroup.items.map(({ text, link }, i) => {
                        return (
                          <li key={i}>
                            <NavLink
                              className="capitalize hover:font-medium hover:text-slate-800 cursor-pointer w-max text-[1.3rem] text-slate-600"
                              to={link}
                            >
                              {text}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
