import React, { Suspense, useContext, useEffect, useState } from 'react';
import cx from 'classnames';

import { productContext } from 'context/productContext';

import getReviewImages from 'utils/getReviewImages';

import { IReview } from 'common/types';
import Loader from 'shared/Loader';
import ProgressiveImage from 'shared/ProgressiveImage';
import resizeImageUrl from 'utils/resizeImageUrl';

interface PhotosListProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: IReview[];
  limit?: number;
  includeShowMore?: boolean;
}

interface IImage {
  i: number;
  j: number;
  idx: number;
  image: string;
}

const PhotosList: React.FC<PhotosListProps> = ({
  className,
  reviews,
  limit,
  includeShowMore,
}) => {
  const [images, setImages] = useState<null | IImage[]>();

  const {
    setSelectedReviewIdx,
    setSelectedReviewNestedIdx,
    setSelectedReviews,
    setShowSlider,
    setShowAllImages,
  } = useContext(productContext);

  useEffect(() => {
    (async () => {
      const images = getReviewImages(reviews)
        .map((images, i) => {
          return images.map((image, j) => {
            return { ...image, i, j };
          });
        })
        .flat();
      setImages(images);
    })();
  }, []);

  if (!images) {
    return <Loader />;
  }

  return (
    <div className={cx(className, 'w-full flex flex-wrap gap-5')}>
      {images
        .slice(0, !!limit ? limit + 1 : images.length)
        .map(({ image, idx, i, j }, k) => {
          image = resizeImageUrl(image, 90, null, 60);
          return (
            <div
              key={image}
              className="relative h-36 w-32 flex-shrink-0 bg-slate-800"
            >
              <button
                className="h-full w-full"
                onClick={() => {
                  setSelectedReviewIdx(i);
                  setSelectedReviewNestedIdx(j);
                  setSelectedReviews(reviews);
                  setShowSlider(true);
                }}
              >
                <ProgressiveImage
                  className="h-full w-full"
                  src={image}
                  alt="review photo"
                />
              </button>
              {includeShowMore &&
                images.length > limit + 1 &&
                !!limit &&
                k === limit && (
                  <button
                    onClick={() => {
                      setSelectedReviews(reviews);
                      setShowAllImages(true);
                    }}
                    className="h-full w-full absolute top-0 left-0 bg-slate-900 bg-opacity-60 text-white font-bold text-md"
                  >
                    + {images.flat().slice(4, images.length).length}
                  </button>
                )}
            </div>
          );
        })}
    </div>
  );
};

export default PhotosList;
