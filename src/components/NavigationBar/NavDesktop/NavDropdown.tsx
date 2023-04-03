import React, { useState } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import navData from '../navData';
import encodeString from 'utils/encodeString';

interface NavDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  navItem: any;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ className, navItem }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className="h-full flex items-center">
        <div
          className={cx(
            'group peer h-full w-full border-b-4 border-b-transparent relative z-10',
            navItem.borderColor
          )}
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseOut={() => {
            setHovered(false);
          }}
        >
          <NavLink
            to={navItem.link}
            onClick={() => {
              setHovered(false);
              return true;
            }}
            className="hover:text-slate-600 uppercase h-full w-full text-xs px-4 flex justify-center items-center font-bold text-slate-700"
          >
            {navItem.title}
          </NavLink>
          <div
            className={cx(
              'fixed left-1/2 -translate-x-1/2 top-[6.9rem] flex max-h-[80%] rounded-b overflow-x-auto overflow-y-auto max-w-[90%] shadow-inner bg-white',
              {
                hidden: !hovered,
              }
            )}
          >
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
                          onClick={() => {
                            setHovered(false);
                            return true;
                          }}
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
                                    onClick={() => {
                                      setHovered(false);
                                      return true;
                                    }}
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
        <div className="fixed left-1/2 -translate-x-1/2 w-screen max-w-screen lg:max-w-[1440px] h-[calc(100vh-7rem)] top-28 rounded hidden peer-hover:flex flex-col items-center bg-slate-900 bg-opacity-30"></div>
      </div>
    </>
  );
};

export default NavDropdown;
