import React, { useState } from 'react';
import cx from 'classnames';

import SecondaryFilters from 'components/SecondaryFilters';
import SortBy from 'components/SortBy';
import FilterValuesList from './FilterValuesList';

import { Filters } from 'utils/searchParamsUtils';

interface FiltersTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: Filters;
}

const FiltersTopbar: React.FC<FiltersTopbarProps> = ({ filters }) => {
  const [filterKey, setFilterKey] = useState<null | string>();

  let values;

  if (filterKey) {
    const obj = { ...filters.text, ...filters.range };
    values = obj[filterKey]?.values;
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className={cx(
          'flex flex-wrap w-full items-center gap-3 px-4 border-b min-h-20 md:h-20 h-auto',
          {
            'border-none': filterKey,
          }
        )}
      >
        <SecondaryFilters
          filters={filters}
          filterKey={filterKey}
          setFilterKey={setFilterKey}
        />
        <SortBy className="ml-auto" />
      </div>
      {values && values.length && (
        <FilterValuesList values={values} filterKey={filterKey} />
      )}
    </div>
  );
};

export default FiltersTopbar;
