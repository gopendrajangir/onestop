import React, { useEffect } from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';

import ShoppingImg from 'assets/img/shopping.png';

import Button from 'shared/Button';
import createCustomUrl from 'utils/createCustomUrl';
import { categoriesData, saleData, topPicksData } from './cardData';

import SaleCard from './SaleCard';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import resizeImageUrl from 'utils/resizeImageUrl';

interface HomePageProps extends React.HTMLAttributes<HTMLDivElement> {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="p-10 sm:p-0">
      <div className="flex sm:p-20 gap-5 flex-col lg:flex-row">
        <div className="flex-1 bg-teal-400 flex gap-5 border rounded-md px-10 lg:px-20 pt-12 justify-between">
          <div className="flex flex-col justify-center items-start">
            <span className="text-slate-600 text-sm uppercase font-bold">
              Upto 70% off
            </span>
            <span className="text-[3rem] font-medium capitalize text-white">
              India's biggest sale
            </span>
            <Button
              onClick={() => {
                navigate({
                  pathname: '/search',
                  search:
                    '?' +
                    createCustomUrl('Tshirts', {
                      'discount.discountPercent': [{ min: 0, max: 70 }],
                    }),
                });
              }}
              className="w-max my-5 rounded-full !bg-white uppercase !text-xs !text-slate-800 px-10"
            >
              Shop Now
            </Button>
          </div>
          <img
            className="h-[20rem] md:h-[28rem] self-end "
            src={ShoppingImg}
            alt="shopping image"
          />
        </div>
        <div className="sm:h-[32rem] lg:h-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {saleData.map(({ bg, urlParams, title, img, discountLabel }) => {
            return (
              <SaleCard
                key={title}
                className={cx(bg, 'py-10 sm:h-full')}
                urlParams={urlParams}
                title={title}
                img={img}
                discountLabel={discountLabel}
              />
            );
          })}
        </div>
      </div>
      <div className="p-20 py-10 sm:p-20">
        <h2>Categories to bag</h2>
        <div className="w-full flex gap-5 gap-y-20 mt-24 flex-wrap">
          {categoriesData.map(({ urlParams, title, img }) => {
            return (
              <CategoryCard
                key={title}
                urlParams={urlParams}
                title={title}
                img={resizeImageUrl(img, 200, null, 90)}
              />
            );
          })}
        </div>
      </div>
      <div className="p-20 pt-10">
        <h2>Top Picks</h2>
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:flex gap-5 mt-20">
          {topPicksData.map(({ urlParams, title, img, discount }) => {
            return (
              <ProductCard
                key={title}
                urlParams={urlParams}
                title={title}
                img={resizeImageUrl(img, 260, null, 90)}
                discountLabel={`under ₹${discount}`}
              />
            );
          })}
        </div>
      </div>
      <div className="bg-amber-200 p-10 flex justify-center items-center">
        <h5 className="normal-case">Couldn't find what you want?</h5>
        <h4 className="ml-2 text-slate-600 !font-medium normal-case">
          Try to search it
        </h4>
      </div>
    </div>
  );
};

export default HomePage;
