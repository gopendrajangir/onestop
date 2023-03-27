import React from 'react';
import cx from 'classnames';

import getPageNumbers from 'utils/getPageNumbers';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  totalPages: number;
  limit: number;
  onPageSelect: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  limit,
  onPageSelect,
  className,
}) => {
  const pages = getPageNumbers(page, limit, totalPages);

  return (
    <div
      className={cx(
        'flex gap-10 sm:gap-4 text-xs text-slate-700 flex-col sm:flex-row',
        className
      )}
    >
      <span className="self-center">
        Page {page} of {totalPages}
      </span>
      <div className="flex-1 flex gap-5 justify-center items-center">
        {page > 1 && (
          <button
            className="border h-16 px-4 w-40 mx-auto border-slate-300 hover:border-slate-500"
            onClick={() => onPageSelect(page - 1)}
          >
            Previous
          </button>
        )}
        <div className="flex flex-wrap justify-center gap-4 self-stretch mx-auto">
          {pages.map((pageNumber, i) => {
            return (
              <button
                className={cx(
                  'h-16 flex justify-center items-center border w-12 border-slate-200 hover:border-slate-400',
                  {
                    'bg-violet-500 text-white font-medium': page === pageNumber,
                    'border-none w-auto text-xl': page >= 10 && i == 1,
                  }
                )}
                key={new Date().getTime() + pageNumber}
                onClick={() => onPageSelect(pageNumber)}
              >
                {page >= 10 && i == 1 ? '...' : pageNumber}
              </button>
            );
          })}
        </div>
        {page < totalPages && (
          <button
            className="border px-4 h-16 w-40 mx-auto border-slate-300 hover:border-slate-500"
            onClick={() => onPageSelect(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
