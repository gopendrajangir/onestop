import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import './image-slider.scss';

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { imageURL: string }[];
  callback: (idx: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  className,
  callback,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const prev = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
  const next = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (activeIndex === -1) {
          setActiveIndex(1);
          callback(1);
        } else if (activeIndex === images.length - 1) {
          setActiveIndex(0);
          callback(0);
        } else {
          setActiveIndex(activeIndex + 1);
          callback(activeIndex + 1);
        }
      },
      !timer ? 900 : 1300
    );

    setTimer(timeout);
  }, [activeIndex, setActiveIndex, setTimer]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(() => {
    return () => {
      callback(0);
    };
  }, []);

  const imgs = [prev, activeIndex, next];

  return (
    <div className={cx(className, 'w-full flex overflow-x-hidden')}>
      {activeIndex === -1 ? (
        <>
          <img className="w-full" src={images[0].imageURL} alt="slide" />
          <img className="w-full" src={images[1].imageURL} alt="slide" />
        </>
      ) : (
        <>
          {imgs.map((i) => {
            return (
              <img
                key={new Date().getTime() + images[i].imageURL}
                className="w-full image-slide"
                src={images[i].imageURL}
                alt="slide"
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ImageSlider;
