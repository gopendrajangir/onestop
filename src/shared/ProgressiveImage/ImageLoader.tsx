import React from 'react';
import cx from 'classnames';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

interface ImageLoaderProps extends IContentLoaderProps {}

const ImageLoader: React.FC<ImageLoaderProps> = ({ className, ...props }) => {
  return (
    <ContentLoader
      speed={2}
      className={cx(className, 'w-full h-full')}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default ImageLoader;
