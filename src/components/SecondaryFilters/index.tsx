import React from 'react';

import SecondaryFiltersItem from './SecondaryFiltersItem';

import { Filters } from 'utils/searchParamsUtils';

interface FiltersTopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: Filters;
  filterKey: string | null;
  setFilterKey: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersTopbar: React.FC<FiltersTopbarProps> = ({
  filters,
  filterKey,
  setFilterKey,
}) => {
  const onClick = (key) => {
    return () => {
      if (filterKey === key) {
        setFilterKey(null);
      } else {
        setFilterKey(key);
      }
    };
  };

  return (
    <div className="flex flex-wrap gap-x-2">
      {Object.keys(filters.text).map((key) => {
        return (
          <SecondaryFiltersItem
            selected={filterKey === key}
            key={key}
            filter={filters.text[key]}
            onClick={onClick(key)}
          />
        );
      })}
      {Object.keys(filters.range).map((key) => {
        return (
          <SecondaryFiltersItem
            selected={filterKey === key}
            key={key}
            filter={filters.range[key]}
            onClick={onClick(key)}
          />
        );
      })}
    </div>
  );
};

export default FiltersTopbar;
