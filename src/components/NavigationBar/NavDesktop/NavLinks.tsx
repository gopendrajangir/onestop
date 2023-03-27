import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import navData from '../navData';
import encodeString from 'utils/encodeString';

interface NavLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  return (
    <div className={cx('z-50 ml-auto mr-auto flex gap-x-12 h-full', className)}>
      {navData.map((navItem) => {
        return (
          <div className="h-full flex items-center" key={navItem.title}>
            <div
              className={cx(
                'group peer h-full w-full border-b-4 border-b-transparent',
                navItem.borderColor
              )}
            >
              <NavLink
                to={`/search?query=${encodeString(navItem.title)}`}
                className="hover:text-slate-600 uppercase h-full w-full text-xs px-4 flex justify-center items-center font-bold text-slate-700"
              >
                {navItem.title}
              </NavLink>
              <div className="z-10 fixed left-1/2 -translate-x-1/2 top-28 hidden group-hover:flex max-h-[80%] rounded-b overflow-x-auto overflow-y-auto max-w-[90%] shadow-inner bg-white">
                {navItem.groups.map((group, i) => {
                  return (
                    <div
                      className="flex flex-col gap-y-7 even:bg-slate-50 p-10"
                      key={i}
                    >
                      {group.map((subgroup, i) => {
                        return (
                          <div
                            key={i}
                            className={cx('flex flex-col gap-y-3 w-[18rem]', {
                              'border-b pb-7 border-b-slate-200':
                                i != group.length - 1,
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
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[calc(100vh-7rem)] top-28 rounded hidden peer-hover:flex flex-col items-center bg-slate-900 bg-opacity-30"></div>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
