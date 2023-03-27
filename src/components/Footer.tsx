import React from 'react';
import cx from 'classnames';

import LogoImg from 'assets/img/logo.png';
import { NavLink } from 'react-router-dom';

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const data = {
    men: [
      'tshirts',
      'trousers',
      'sweaters',
      'shirts',
      'blazers',
      'kurtas',
      'jeans',
    ],
    women: [
      'kurtas',
      'sarees',
      'tops',
      'tshirts',
      'dresses',
      'playsuits',
      'fragrances',
    ],
    kids: [
      'tshirts',
      'shirts',
      'sweatshirts',
      'thermals',
      'toys',
      'partywear',
      'dresses',
    ],
    'home & living': [
      'bed runners',
      'bedsheets',
      'blankets',
      'pillows',
      'clocks',
      'fountains',
      'face towels',
    ],
    beauty: [
      'lipstick',
      'mascara',
      'face moisturiser ',
      'sunscreen',
      'face wash',
      'hair oil',
      'shampoo',
    ],
  };
  return (
    <div
      className={cx(
        className,
        'min-h-[40rem] bg-slate-700 pt-16 flex flex-col items-center gap-10'
      )}
    >
      <div className="flex items-center gap-x-2">
        <img className="w-20" src={LogoImg} alt="logo" />
        <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-pink-600">
          Onestop
        </h3>
      </div>
      <div className="flex-1 flex items-center p-10">
        <div className="flex gap-x-16 flex-wrap gap-10">
          {Object.keys(data).map((key) => {
            return (
              <div key={key} className="flex flex-col w-[12rem]">
                <h5 className="text-slate-400">{key}</h5>
                <div className="flex flex-col gap-y-1 text-slate-400 capitalize text-xs mt-4">
                  {data[key].map((val) => {
                    return (
                      <NavLink
                        key={key + val}
                        className="text-xs capitalize hover:font-medium"
                        to={`/search?query=${val}`}
                      >
                        {val}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-slate-400 text-sm p-5">
        Copyright &copy; All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
