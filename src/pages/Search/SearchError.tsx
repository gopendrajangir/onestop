import React from 'react';
import cx from 'classnames';

import SearchErrorImg from 'assets/img/error-search.jpg';

interface SearchErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorCode: number;
  message: string;
}

const SearchError: React.FC<SearchErrorProps> = ({
  className,
  errorCode,
  message,
}) => {
  return (
    <div
      className={cx(
        className,
        'flex-1 flex flex-col justify-center items-center'
      )}
    >
      <img className="h-64" src={SearchErrorImg} alt={'Search Error Image'} />
      <div className="flex items-center gap-x-3">
        <h4>{errorCode}</h4>
        <p className="text-[1.4rem]">{message}</p>
      </div>
    </div>
  );
};

export default SearchError;
