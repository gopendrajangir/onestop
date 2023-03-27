import React from 'react';
import cx from 'classnames';

import RatingStatus from 'shared/RatingStatus';

import { ratingBgMap } from 'utils/ratingColorMapping';
import timeFormatter from 'utils/timeFormatter';

import { IReview } from 'common/types';
import PhotosList from './PhotosList';

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  review: IReview;
  includePhotos?: boolean;
}

const Review: React.FC<ReviewProps> = ({
  className,
  review,
  includePhotos = false,
}) => {
  const { _id, rating, review: reviewText, username, images } = review;
  return (
    <div className={cx(className, 'flex gap-x-3')}>
      <div className="pt-1">
        <RatingStatus
          rating={rating}
          className={cx(
            'text-white text-xxs p-1 rounded py-0.5 gap-x-1',
            ratingBgMap(rating)
          )}
          iconClassName="!fill-white h-4"
        />
      </div>
      <div className="flex-1 flex flex-col gap-y-4">
        <p className="text-sm">{reviewText}</p>
        {includePhotos && (
          <PhotosList reviews={[review]} limit={3} includeShowMore />
        )}
        <div className="text-xs flex gap-x-4 text-slate-500">
          <span className="capitalize">{username}</span>
          <span>|</span>
          <span>{timeFormatter(new Date())}</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
