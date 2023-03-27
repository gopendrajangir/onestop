import React from 'react';
import cx from 'classnames';

import StarIcon from 'assets/img/icons/star.svg';

import { ratingBgMap } from 'utils/ratingColorMapping';

interface RatingInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  ratingInfo: {
    rating: number;
    count: number;
  }[];
  totalCount?: number;
}

const RatingInfo: React.FC<RatingInfoProps> = ({
  className,
  ratingInfo,
  totalCount,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      {ratingInfo
        .sort((a, b) => b.rating - a.rating)
        .map(({ rating, count }) => {
          return (
            <div
              key={rating}
              className={cx(className, 'flex items-center gap-x-2')}
            >
              <span className="text-slate-400">{rating}</span>{' '}
              <StarIcon className="h-4 fill-slate-200" />{' '}
              <div className="flex w-48 h-1.5 bg-slate-200">
                <div
                  className={cx(ratingBgMap(rating))}
                  style={{
                    width: totalCount ? (count * 100) / totalCount + '%' : 0,
                  }}
                ></div>
              </div>{' '}
              {count}
            </div>
          );
        })}
    </div>
  );
};

export default RatingInfo;
