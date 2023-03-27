import React from 'react';
import cx from 'classnames';
import { IReview } from 'common/types';

import PhotosList from 'components/PhotosList';

import flattenReviewsByImages from 'utils/flattenReviewsByImages';

interface CustomerPhotosProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: IReview[];
}

const CustomerPhotos: React.FC<CustomerPhotosProps> = ({
  className,
  reviews,
}) => {
  const flattenReviews = flattenReviewsByImages(reviews);

  if (!flattenReviews || !flattenReviews.length) {
    return null;
  }

  return (
    <div className={cx(className, '')}>
      <h5
        className={cx(
          'flex capitalize items-center gap-x-2 my-10 text-sm tracking-wide'
        )}
      >
        Customer Photos ({flattenReviews.length})
      </h5>
      <PhotosList reviews={reviews} limit={3} includeShowMore />
    </div>
  );
};

export default CustomerPhotos;
