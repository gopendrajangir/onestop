import React from 'react';
import cx from 'classnames';

interface HrProps extends React.HTMLAttributes<HTMLDivElement> {}

const Hr: React.FC<HrProps> = ({ className }) => {
  return <hr className={cx('my-5 border-slate-300', className)} />;
};

export default Hr;
