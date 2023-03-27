import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ClearIcon from 'assets/img/icons/clear.svg';

import { productsContext } from 'context/productsContext';

import onFilterSelect from 'utils/onFilterSelect';

interface SelectedFilterItemProps extends React.HTMLAttributes<HTMLDivElement> {
  _id: string;
  filterKey: string;
  range?: { min: number; max: number };
}

const SelectedFilterItem: React.FC<SelectedFilterItemProps> = ({
  _id,
  filterKey,
  range,
}) => {
  const [searchParams] = useSearchParams();
  const { isLoading } = useContext(productsContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-x-1 pl-5 pr-3 py-2 text-xxs border border-slate-300 rounded-full text-center text-slate-600">
      <span>{_id}</span>
      <button
        onClick={() => {
          if (!isLoading) {
            onFilterSelect(
              searchParams,
              filterKey,
              _id,
              true,
              navigate,
              false,
              range
            );
          }
        }}
      >
        <ClearIcon className="h-6 w-6 fill-slate-400" />
      </button>
    </div>
  );
};

export default SelectedFilterItem;
