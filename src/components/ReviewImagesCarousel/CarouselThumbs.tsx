import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import LeftIcon from 'assets/img/icons/chevron-left.svg';
import RightIcon from 'assets/img/icons/chevron-right.svg';

import resizeImageUrl from 'utils/resizeImageUrl';
import ProgressiveImage from 'shared/ProgressiveImage';

interface CarouselThumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { idx: number; image: string }[];
  onImageSelect: (id: number) => void;
  idx: number;
}

const CarouselThumbs: React.FC<CarouselThumbsProps> = ({
  className,
  images,
  onImageSelect,
  idx,
}) => {
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    setStartIdx((i) => {
      if (idx < i || idx > i + 2) {
        return Math.floor(idx - (idx % 3));
      }
      return i;
    });
  }, [images, idx]);

  return (
    <div className={cx('w-full flex items-center px-5', className)}>
      {startIdx > 2 && (
        <button
          onClick={() => {
            setStartIdx(startIdx - 3);
          }}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
        >
          <LeftIcon className="w-8 h-8 fill-white" />
        </button>
      )}
      <div className="flex items-center gap-x-4 p-10 ml-auto mr-auto">
        {images.slice(startIdx, startIdx + 3).map(({ image }, i) => {
          image = resizeImageUrl(image, 100, null, 60);
          return (
            <button
              key={image}
              onClick={() => {
                onImageSelect(i + startIdx);
              }}
              className={cx('flex-shrink-0 w-32 h-32', {
                'border-[5px] border-white': i + startIdx === idx,
              })}
            >
              <ProgressiveImage
                className={cx('w-full h-full')}
                src={image}
                alt="carousel slide"
              />
            </button>
          );
        })}
      </div>
      {startIdx + 3 < images.length && (
        <button
          onClick={() => {
            setStartIdx(startIdx + 3);
          }}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
        >
          <RightIcon className="w-8 h-8 fill-white" />
        </button>
      )}
    </div>
  );
};

export default CarouselThumbs;
