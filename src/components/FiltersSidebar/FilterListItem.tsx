import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

import MultiColor from 'assets/img/multi.png';

import CheckBox from 'shared/CheckBox';

import { productsContext } from 'context/productsContext';

import { RangeFilterValue, TextFilterValue } from 'utils/searchParamsUtils';
import { colorMappings } from 'utils/colors';
import onFilterSelect from 'utils/onFilterSelect';

interface FilterListItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  filter: TextFilterValue | RangeFilterValue;
  filterKey: string;
  isRadio?: boolean;
}

const FilterListItem: React.FC<FilterListItemProps> = ({
  filterKey,
  filter,
  isRadio,
}) => {
  const [currentSelected, setCurrentSelected] = useState<boolean>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isLoading } = useContext(productsContext);
  const { _id, selected, count } = filter;

  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  let range;

  if ('range' in filter) {
    range = filter.range;
  }

  return (
    <button
      key={_id}
      className="flex text-start items-center text-[1.3rem] font-light gap-x-3"
      onClick={() => {
        setCurrentSelected(selected);
        if (!isLoading) {
          onFilterSelect(
            searchParams,
            filterKey,
            _id,
            selected,
            navigate,
            isRadio,
            range
          );
        }
      }}
    >
      <CheckBox selected={currentSelected} isRadio={isRadio} />
      {filterKey === 'baseColor' &&
        (_id === 'Multi' ? (
          <img
            className="w-6 h-6 rounded-full"
            src={MultiColor}
            alt="multi color image"
          />
        ) : (
          <div
            className="border w-6 h-6 rounded-full"
            style={{
              backgroundColor:
                _id === 'Assorted'
                  ? "linear-gradient(to left, '#CD5C5C', '#FF69B4')"
                  : colorMappings[_id],
            }}
          ></div>
        ))}
      <div></div>
      <span
        className={cx({
          'font-medium': isRadio,
        })}
      >
        {_id}
      </span>
      <span className="font-light text-gray-400">({count})</span>
    </button>
  );
};

export default FilterListItem;
