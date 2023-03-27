import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import { useQuery } from 'react-query';

import Loader from 'shared/Loader';

interface AutoCompleteProps extends React.HTMLAttributes<HTMLDivElement> {
  onItemSelect: (item: string) => void;
  query: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = React.forwardRef<
  HTMLDivElement,
  AutoCompleteProps
>(({ className, onItemSelect, query }, ref) => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isItemSelected, setIsItemSelected] = useState(false);

  const { data, isLoading } = useQuery(
    ['fetch-autocomplete', query],
    () => {
      return axios.get(`/products/autocomplete?query=${query}`);
    },
    {
      refetchInterval: false,
    }
  );

  const suggestions = data?.data?.result;

  const keyPressEventHandler = useCallback(
    (e) => {
      setActiveIdx((idx) => {
        if (e.key === 'Enter' && idx !== -1) {
          e.preventDefault();
          setIsItemSelected(true);
        }
        if (e.key === 'ArrowUp' && idx !== 0) {
          return idx - 1;
        }
        if (e.key === 'ArrowDown' && idx !== suggestions.length - 1) {
          return idx + 1;
        }
        return idx;
      });
    },
    [suggestions]
  );

  useEffect(() => {
    if (isItemSelected && suggestions?.length) {
      onItemSelect(suggestions[activeIdx].phrase);
    }
  }, [isItemSelected, activeIdx, suggestions]);

  useEffect(() => {
    window.addEventListener('keydown', keyPressEventHandler);

    return () => {
      window.removeEventListener('keydown', keyPressEventHandler);
    };
  }, [keyPressEventHandler]);

  if (!isLoading && !suggestions.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cx(
        className,
        'flex flex-col  border rounded-b pt-3 max-h-[36rem] overflow-y-auto'
      )}
    >
      {isLoading && (
        <div className="w-full h-80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!isLoading &&
        suggestions &&
        !!suggestions.length &&
        suggestions.map(({ phrase }, i) => {
          return (
            <button
              key={phrase + i}
              onClick={() => onItemSelect(phrase)}
              type="button"
              className={cx(
                'w-full text-start hover:bg-slate-700 hover:text-slate-50 hover:font-medium px-4 py-4 capitalize text-xs',
                {
                  'bg-slate-700 text-slate-50 font-medium': i === activeIdx,
                }
              )}
            >
              {phrase}
            </button>
          );
        })}
    </div>
  );
});

export default AutoComplete;
