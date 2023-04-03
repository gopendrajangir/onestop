import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ImageLoader from './ImageLoader';

interface ProgressiveImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  loaderClassName?: string;
}

function isCached(src) {
  var image = new Image();
  image.src = src;

  return image.complete;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  className,
  loaderClassName,
  src,
  alt,
}) => {
  const [loadedSrc, setLoadedSrc] = useState<null | string>(
    isCached(src) ? src : null
  );

  useEffect(() => {
    if (!loadedSrc) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        setLoadedSrc(src);
      };
    }
  }, [src]);

  return (
    <div className={cx(className)}>
      {!loadedSrc ? (
        <ImageLoader className={cx(loaderClassName)} />
      ) : (
        <img
          className={cx('w-full h-full object-cover')}
          src={loadedSrc}
          alt={alt}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
