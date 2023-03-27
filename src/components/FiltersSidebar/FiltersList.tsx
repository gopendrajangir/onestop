import React, { useState } from 'react';
import cx from 'classnames';

import FilterListItem from './FilterListItem';

import { RangeFilter, TextFilter } from 'utils/searchParamsUtils';

interface FiltersListProps extends React.HTMLAttributes<HTMLDivElement> {
  filter: TextFilter | RangeFilter;
  filterKey: string;
}

const FiltersList: React.FC<FiltersListProps> = ({ filter, filterKey }) => {
  const [showMore, setShowMore] = useState(false);

  const { title, values } = filter;

  if (values.length === 1 && !values[0].selected) {
    return null;
  }

  return (
    <div className="pl-12 py-8 border-b" key={title}>
      <h5
        className={cx('mb-5', {
          hidden: title.toLowerCase() === 'gender',
        })}
      >
        {title}
      </h5>
      <ul className="flex items-start flex-col gap-y-2">
        {values.slice(0, showMore ? -1 : 10).map((value) => {
          return (
            <FilterListItem
              filter={value}
              key={value._id}
              filterKey={filterKey}
              isRadio={[
                'analytics.gender',
                'discount.discountPercent',
              ].includes(filterKey)}
            />
          );
        })}
        {values.length > 10 && (
          <button
            className="mt-2 text-violet-500 text-xs font-medium self-start"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? `+${values.length - 10} More items` : `Show less`}
          </button>
        )}
      </ul>
    </div>
  );
};

export default FiltersList;
