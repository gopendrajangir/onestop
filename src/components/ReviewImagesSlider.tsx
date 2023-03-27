import React, { useState } from 'react';
import cx from 'classnames';

import ClearIcon from 'assets/img/icons/clear.svg';

import Review from './Review';

import getReviewImages from 'utils/getReviewImages';

import { IReview } from 'common/types';
import Modal from 'shared/Modal';
import ReviewImagesCarousel from 'components/ReviewImagesCarousel';

interface ReviewImagesSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: IReview[];
  currentIdx?: number;
  currentNestedIdx?: number;
  onClose: () => void;
}

const ReviewImagesSlider: React.FC<ReviewImagesSliderProps> = ({
  className,
  reviews,
  onClose,
  currentIdx = 0,
  currentNestedIdx = 0,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>();

  const idx = activeIdx ?? currentIdx;

  return (
    <Modal onClose={onClose}>
      <div className="h-[50rem] w-[40rem] relative">
        <ReviewImagesCarousel
          className="bg-slate-900 rounded-md md:rounded-none"
          images={getReviewImages(reviews)}
          callback={(id) => setActiveIdx(id)}
          activeIdx={idx}
          nestedActiveIdx={currentNestedIdx}
          showThumbs
        />
        <button
          onClick={() => onClose()}
          className="absolute top-3 left-3 w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
        >
          <ClearIcon className="w-8 h-8 fill-white" />
        </button>
      </div>
      <div className="hidden md:flex w-[40rem] p-10 h-[50rem] bg-white">
        <Review review={reviews[idx]} />
      </div>
    </Modal>
  );
};

export default ReviewImagesSlider;
