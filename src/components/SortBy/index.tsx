import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cx from 'classnames';

import ChevronDownIcon from 'assets/img/icons/chevron-down.svg';

import {
  parseSearchParams,
  stringifySearchParams,
  urlParamMappings,
} from 'utils/searchParamsUtils';
import SortItem from './SortItem';

interface SortByProps extends React.HTMLAttributes<HTMLDivElement> {}

const SortBy: React.FC<SortByProps> = ({ className }) => {
  const [hovered, setHovered] = useState(false);
  const [params] = useSearchParams();

  const searchParams = parseSearchParams(params);

  const navigate = useNavigate();

  const sortItems = {
    discount: 'Better Discounts',
    rating: 'Customer Rating',
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
  };

  const onSelect = (key: string) => {
    if (key === 'none' || !urlParamMappings[key]) {
      delete searchParams.sort;
    } else {
      const sortObj = {};

      const sortArr = urlParamMappings[key]
        .split('|')
        .map((str) => str.split(','));

      sortArr.map(([key, value]) => {
        sortObj[key] = parseInt(value);
      });

      searchParams.sort = sortObj;
    }
    navigate({
      pathname: '/search',
      search: '?' + stringifySearchParams(searchParams),
    });
  };

  const selected = !params.get('sort') ? 'rating' : params.get('sort');

  return (
    <div
      className={cx(className, 'relative text-xs w-96 group hover:shadow-lg')}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div className="w-full flex items-center gap-x-2 border h-16 px-4">
        <span>Sort by :</span>
        <span className="font-medium">
          {params.get('sort')
            ? sortItems[params.get('sort')]
            : sortItems['rating']}
        </span>
        <ChevronDownIcon className="ml-auto h-6 w-6 fill-slate-400" />
      </div>
      <div
        className={cx(
          'flex-col z-20 absolute top-full border border-t-0 w-full bg-white hidden',
          {
            '!flex': hovered,
          }
        )}
      >
        {Object.keys(sortItems).map((key) => {
          return (
            <SortItem
              key={key}
              selected={key === selected}
              onSelect={() => {
                setHovered(false);
                onSelect(key);
              }}
              title={sortItems[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SortBy;
