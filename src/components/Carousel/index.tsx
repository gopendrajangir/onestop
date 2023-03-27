import React, { useState } from 'react';
import cx from 'classnames';

import LeftIcon from 'assets/img/icons/chevron-left.svg';
import RightIcon from 'assets/img/icons/chevron-right.svg';

import ProgressiveImage from 'shared/ProgressiveImage';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ className, images }) => {
  const [idx, setIdx] = useState(0);

  return (
    <div className={cx(className, 'flex flex-col w-full')}>
      <div className="w-full flex-1 flex relative">
        <div className="flex justify-center flex-1 w-full">
          <ProgressiveImage
            key={images[idx]}
            className="w-full aspect-[3/4]"
            src={images[idx]}
            alt="ReviewImagesCarousel image"
          />
        </div>
        {idx !== 0 && (
          <div className="z-10 flex items-center absolute top-0 ml-2  left-0 h-full">
            <button
              onClick={() => {
                setIdx(idx - 1);
              }}
              className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
            >
              <LeftIcon className="w-8 h-8 fill-white" />
            </button>
          </div>
        )}
        {idx !== images.length - 1 && (
          <div className="z-10 flex items-center absolute top-0 mr-2 right-0 h-full">
            <button
              className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
              onClick={() => {
                setIdx(idx + 1);
              }}
            >
              <RightIcon className="w-8 h-8 fill-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
