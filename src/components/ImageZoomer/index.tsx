import React, { useState } from 'react';
import cx from 'classnames';

import LeftIcon from 'assets/img/icons/chevron-left.svg';
import RightIcon from 'assets/img/icons/chevron-right.svg';

import './image-zoomer.scss';

import { IImage } from 'common/types';
import resizeImageUrl from 'utils/resizeImageUrl';
import ProgressiveImage from 'shared/ProgressiveImage';
import ScrollWithCursor from './ScrollWithCursor';

interface ImageZoomerProps extends React.HTMLAttributes<HTMLDivElement> {
  images: IImage[];
  defaultActiveIndex: number;
}

const ImageZoomer: React.FC<ImageZoomerProps> = ({
  className,
  images,
  defaultActiveIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const idx = activeIndex ?? defaultActiveIndex;

  const image = resizeImageUrl(images[idx].src, 1440, 1080, 90);

  return (
    <div
      className={cx(
        className,
        'h-screen relative lg:w-[108rem] w-[calc(100vw-2rem)]'
      )}
    >
      <ScrollWithCursor className="h-full overflow-y-auto scrollbar-hide">
        <ProgressiveImage
          className="aspect-[3/4] scroll-wheel-cursor"
          key={image}
          src={image}
          alt="zoom image thumbnail"
        />
      </ScrollWithCursor>
      {idx !== 0 && (
        <div className="flex items-center absolute top-0 ml-[7rem] left-0 h-full">
          <button
            onClick={() => {
              setActiveIndex(idx - 1);
            }}
            className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
          >
            <LeftIcon className="w-8 h-8 fill-white" />
          </button>
        </div>
      )}
      {idx !== images.length - 1 && (
        <div className="flex items-center absolute top-0 mr-2 right-0 h-full">
          <button
            onClick={() => {
              setActiveIndex(idx + 1);
            }}
            className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-80 flex items-center justify-center"
          >
            <RightIcon className="w-8 h-8 fill-white" />
          </button>
        </div>
      )}
      <div className="absolute top-5 left-5 flex flex-col gap-y-2 ">
        {images.map(({ src }, i) => {
          const image = resizeImageUrl(src, 50, null, 60);

          return (
            <button key={image} onClick={() => setActiveIndex(i)}>
              <ProgressiveImage
                className={cx('h-[5rem] aspect-[3/4] border border-slate-600', {
                  'border-2 !border-violet-500': i === idx,
                })}
                src={image}
                alt="zoom image thumbnail"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageZoomer;
