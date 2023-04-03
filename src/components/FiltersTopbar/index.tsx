import React, { useState } from 'react';
import cx from 'classnames';

import SecondaryFilters from 'components/SecondaryFilters';
import SortBy from 'components/SortBy';
import FilterValuesList from './FilterValuesList';

import { Filters } from 'utils/searchParamsUtils';

interface FiltersTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: Filters;
}

const FiltersTopbar: React.FC<FiltersTopbarProps> = ({
  filters,
  className,
}) => {
  const [filterKey, setFilterKey] = useState<null | string>();

  let values;

  if (filterKey) {
    const obj = { ...filters.text, ...filters.range };
    values = obj[filterKey]?.values;
  }

  return (
    <div className={cx('flex flex-col w-full', className)}>
      <div
        className={cx(
          'flex flex-col-reverse items-start sm:flex-row flex-wrap w-full sm:items-center gap-3 p-5 sm:px-4 sm:p-0 border-b min-h-20 h-auto sm:h-20',
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
        <SortBy className="sm:ml-auto" />
      </div>
      {values && values.length && (
        <FilterValuesList values={values} filterKey={filterKey} />
      )}
    </div>
  );
};

export default FiltersTopbar;
