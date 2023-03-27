import React from 'react';
import cx from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './sidebar.scss';

import FiltersList from './FiltersList';

import {
  Filters,
  parseSearchParams,
  stringifySearchParams,
} from 'utils/searchParamsUtils';
import ifFiltersExist from 'utils/ifFiltersExist';

interface FiltersSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: Filters;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  className,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  function clearAll() {
    const params = parseSearchParams(searchParams);
    params.filters.text = {};
    params.filters.range = {};
    navigate({
      pathname: '/search',
      search: '?' + stringifySearchParams(params),
    });
  }

  const filtersExist = ifFiltersExist(filters);

  return (
    <div
      className={cx(
        className,
        'w-96 h-full flex flex-col flex-shrink-0 bg-white'
      )}
      {...props}
    >
      <div className="flex justify-between items-center px-12 h-20 border-b">
        <h5>Filters</h5>
        <button
          className="uppercase text-xs text-violet-500 font-medium"
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>
      <div className="flex-1 flex flex-col filters-list overflow-y-auto overflow-x-hidden">
        <div className="border-r flex-1 flex flex-col">
          {filtersExist ? (
            Object.keys(filters).map((filterType) => {
              return Object.keys(filters[filterType]).map((key) => {
                if (!filters[filterType][key].values.length) return null;
                return (
                  <FiltersList
                    key={key}
                    filterKey={key}
                    filter={filters[filterType][key]}
                  />
                );
              });
            })
          ) : (
            <div className="flex-1 flex capitalize self-center justify-center items-center">
              <h6>No Filters to apply!</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
