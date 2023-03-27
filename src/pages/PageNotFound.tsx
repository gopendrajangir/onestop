import React from 'react';
import cx from 'classnames';

interface PageNotFoundProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageNotFound: React.FC<PageNotFoundProps> = ({ className }) => {
  return (
    <div className={cx(className, '')}>
      <h1>Page not found</h1>
    </div>
  );
};

export default PageNotFound;
