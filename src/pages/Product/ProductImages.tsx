import React, { useState } from 'react';
import cx from 'classnames';

import ProgressiveImage from 'shared/ProgressiveImage';

import resizeImageUrl from 'utils/resizeImageUrl';

import { IImage } from 'common/types';
import Modal from 'shared/Modal';
import ImageZoomer from 'components/ImageZoomer';
import Carousel from 'components/Carousel';

interface ProductImagesProps extends React.HTMLAttributes<HTMLDivElement> {
  images: IImage[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ className, images }) => {
  const [showZoomer, setShowZoomer] = useState(false);
  const [zoomImageIdx, setZoomImageIdx] = useState(0);

  return (
    <>
      {showZoomer && (
        <Modal
          onClose={() => setShowZoomer(false)}
          closeButtonPosition="top-right"
        >
          <ImageZoomer images={images} defaultActiveIndex={zoomImageIdx} />
        </Modal>
      )}
      <div className="flex-1 self-start hidden md:grid grid-cols-1 lg:grid-cols-2 gap-5">
        {images.map(({ src }, i) => {
          src = resizeImageUrl(src, 720, 540, 90);

          return (
            <div
              key={src}
              className="w-full aspect-[3/4] overflow-hidden hover:cursor-zoom-in"
              onClick={() => {
                setZoomImageIdx(i);
                setShowZoomer(true);
              }}
            >
              <ProgressiveImage
                className="w-full h-full hover:scale-[105%] transition-all duration-500"
                loaderClassName="!h-auto aspect-[3/4]"
                src={src}
                alt="product-image"
              />
            </div>
          );
        })}
      </div>
      <Carousel
        className="md:hidden w-full bg-orange-100"
        images={images.map(({ src }) => resizeImageUrl(src, 720, 540, 90))}
      />
    </>
  );
};

export default ProductImages;
