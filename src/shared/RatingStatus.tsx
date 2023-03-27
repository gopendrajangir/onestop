import React from 'react';
import cx from 'classnames';

import StarIcon from 'assets/img/icons/star.svg';

import { ratingFillMap } from 'utils/ratingColorMapping';

interface RatingStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  iconClassName?: string;
}

const RatingStatus: React.FC<RatingStatusProps> = ({
  rating,
  className,
  iconClassName,
}) => {
  if (!rating) return null;
  return (
    <div className={cx('flex gap-x-2 items-center', className)}>
      <span className="leading-none">
        {rating % Math.floor(rating) === 0
          ? Math.floor(rating)
          : rating.toFixed(1)}
      </span>
      <StarIcon className={cx('h-5', iconClassName, ratingFillMap(rating))} />
    </div>
  );
};

export default RatingStatus;
