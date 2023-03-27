import React from 'react';
import cx from 'classnames';

import ChevronDownIcon from 'assets/img/icons/chevron-down.svg';
import ChevronUpIcon from 'assets/img/icons/chevron-up.svg';

import { RangeFilter, TextFilter } from 'utils/searchParamsUtils';

interface FiltersTopbarItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  filter: TextFilter | RangeFilter;
  selected: boolean;
}

const FiltersTopbarItem: React.FC<FiltersTopbarItemProps> = ({
  filter: { title },
  selected,
  className,
  ...props
}) => {
  return (
    <button
      className={cx(
        'flex items-center gap-x-1 px-4 py-2 text-xs rounded-full text-center text-slate-600 hover:bg-slate-100',
        {
          'bg-slate-100': selected,
        }
      )}
      {...props}
    >
      {title}
      {selected ? (
        <ChevronUpIcon className="h-6 w-6 fill-slate-600" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 fill-slate-400" />
      )}
    </button>
  );
};

export default FiltersTopbarItem;
