import React from 'react';
import cx from 'classnames';
import { IReview } from 'common/types';
import Review from 'components/Review';

interface UserReviewsProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: IReview[];
}

const UserReviews: React.FC<UserReviewsProps> = ({ className, reviews }) => {
  return (
    <div className={cx(className, '')}>
      <h5
        className={cx(
          'flex capitalize items-center gap-x-2 my-10 text-sm tracking-wide'
        )}
      >
        Customer Reviews ({reviews.length})
      </h5>
      <div className="flex flex-col gap-y-5 mt-10">
        {reviews.map((review) => {
          return (
            <Review key={review._id} review={review} includePhotos={true} />
          );
        })}
      </div>
    </div>
  );
};

export default UserReviews;
