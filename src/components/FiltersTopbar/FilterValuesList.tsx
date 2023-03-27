import React from 'react';

import FilterListItem from 'components/FiltersSidebar/FilterListItem';

import { RangeFilterValue, TextFilterValue } from 'utils/searchParamsUtils';

interface FilterValuesListProps extends React.HTMLAttributes<HTMLDivElement> {
  values: TextFilterValue[] | RangeFilterValue[];
  filterKey: string;
}

const FilterValuesList: React.FC<FilterValuesListProps> = ({
  values,
  filterKey,
}) => {
  return (
    <div className="flex gap-5 mt-5 px-7 flex-wrap">
      {values.map((value) => {
        return (
          <FilterListItem
            key={value._id}
            filterKey={filterKey}
            filter={value}
          />
        );
      })}
    </div>
  );
};

export default FilterValuesList;
