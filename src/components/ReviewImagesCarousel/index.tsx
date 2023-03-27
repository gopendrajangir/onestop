import React, { Suspense, useState } from 'react';
import cx from 'classnames';

import LeftIcon from 'assets/img/icons/chevron-left.svg';
import RightIcon from 'assets/img/icons/chevron-right.svg';

import ProgressiveImage from 'shared/ProgressiveImage';

import resizeImageUrl from 'utils/resizeImageUrl';
import CarouselThumbs from './CarouselThumbs';

interface ReviewImagesCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: { idx: number; image: string }[][];
  callback: (id: number) => void;
  activeIdx?: number;
  nestedActiveIdx?: number;
  showThumbs?: boolean;
}

const ReviewImagesCarousel: React.FC<ReviewImagesCarouselProps> = ({
  className,
  images,
  callback,
  activeIdx = 0,
  nestedActiveIdx = 0,
  showThumbs = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [nestedActiveIndex, setNestedActiveIndex] = useState<number>();

  const idx = activeIndex ?? activeIdx;
  const nestedIdx = nestedActiveIndex ?? nestedActiveIdx;

  const imageUrl = resizeImageUrl(images[idx][nestedIdx].image, 500, null, 60);

  return (
    <div className={cx(className, 'flex flex-col w-full h-full')}>
      <div className="w-full flex-1 flex relative">
        <div className="flex justify-center flex-1 w-full">
          <ProgressiveImage
            key={imageUrl}
            className="h-[35rem] w-auto"
            src={imageUrl}
            alt="ReviewImagesCarousel image"
          />
        </div>
        {(idx !== 0 || nestedIdx !== 0) && (
          <div className="z-10 flex items-center absolute top-0 ml-2  left-0 h-full">
            <button
              onClick={() => {
                if (nestedIdx === 0) {
                  setActiveIndex(idx - 1);
                  setNestedActiveIndex(images[idx - 1].length - 1);
                  callback(images[idx - 1][0].idx);
                } else {
                  setNestedActiveIndex(nestedIdx - 1);
                }
              }}
              className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
            >
              <LeftIcon className="w-8 h-8 fill-white" />
            </button>
          </div>
        )}
        {(idx !== images.length - 1 ||
          nestedIdx !== images[idx].length - 1) && (
          <div className="z-10 flex items-center absolute top-0 mr-2 right-0 h-full">
            <button
              className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
              onClick={() => {
                if (nestedIdx === images[idx].length - 1) {
                  setActiveIndex(idx + 1);
                  setNestedActiveIndex(0);
                  callback(images[idx + 1][0].idx);
                } else {
                  setNestedActiveIndex(nestedIdx + 1);
                }
              }}
            >
              <RightIcon className="w-8 h-8 fill-white" />
            </button>
          </div>
        )}
      </div>
      {showThumbs && (
        <CarouselThumbs
          className="flex-1"
          images={images[idx]}
          onImageSelect={(idx) => {
            setNestedActiveIndex(idx);
          }}
          idx={nestedIdx}
        />
      )}
    </div>
  );
};

export default ReviewImagesCarousel;
