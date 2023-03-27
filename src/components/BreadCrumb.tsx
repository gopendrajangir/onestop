import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { IAnalytics, IQueryObject } from 'common/types';

import createBreads from 'utils/createBreads';

interface BreadCrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  queryObject?: IQueryObject;
  analytics: IAnalytics;
  isSingleProduct?: boolean;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  queryObject,
  analytics,
  isSingleProduct,
  className,
}) => {
  const breads = createBreads(queryObject, analytics, isSingleProduct);

  return (
    <div className={cx('flex gap-x-2', className)}>
      {breads.map(({ link, value }, i) => {
        return (
          <React.Fragment key={value + i}>
            <NavLink
              className={cx('capitalize text-slate-500', {
                '!font-bold !text-slate-700': i === breads.length - 1,
              })}
              to={link}
            >
              {value}
            </NavLink>
            {isSingleProduct &&
              i !== breads.length - 2 &&
              i !== breads.length - 1 && (
                <span className="text-slate-500">/</span>
              )}
            {!isSingleProduct && i !== breads.length - 1 && (
              <span className="text-slate-500">/</span>
            )}
            {isSingleProduct && i === breads.length - 2 && (
              <span className="text-slate-500 font-bold">{`>`}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
