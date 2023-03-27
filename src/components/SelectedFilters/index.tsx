import React from 'react';

import SelectedFilterItem from './SelectedFilterItem';

import { SelectedFiltersType } from 'utils/searchParamsUtils';

interface SelectedFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: SelectedFiltersType;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters }) => {
  if (!Object.keys(filters).length) return null;

  return (
    <div className="flex flex-wrap px-5 mt-10 gap-3">
      {Object.keys(filters).map((key) => {
        return filters[key].values.map(({ _id, range }) => {
          return (
            <SelectedFilterItem
              key={_id}
              _id={_id}
              filterKey={key}
              range={range}
            />
          );
        });
      })}
    </div>
  );
};

export default SelectedFilters;
