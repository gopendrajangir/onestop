import React, { useState, useCallback, useMemo } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import './product-thumbnail.scss';

import HeartIcon from 'assets/img/icons/heart-o.svg';

import RatingStatus from 'shared/RatingStatus';
import ImageSlider from 'components/ImageSlider';

import numberFormatter from 'utils/numberFormatter';
import resizeImageUrl from 'utils/resizeImageUrl';

import { IProduct } from 'common/types';
import ProgressiveImage from 'shared/ProgressiveImage';
import SliderNavigator from './SliderNavigator';

interface ProductThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  product: IProduct;
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);

  const mouseoverHandler = useCallback(() => {
    setIsSliderActive(true);
  }, []);

  const mouseleaveHandler = useCallback(() => {
    setIsSliderActive(false);
  }, []);

  const {
    _id,
    ratings,
    name,
    brand,
    discount,
    mrp,
    media: { albums },
  } = product;

  const images = useMemo(
    () =>
      albums[0].images.map((image) => {
        return {
          ...image,
          imageURL: resizeImageUrl(
            image.src,
            document.body.clientWidth < 640 ? 460 : 260,
            null,
            90
          ),
        };
      }),
    []
  );

  return (
    <div
      onMouseOver={mouseoverHandler}
      onMouseLeave={mouseleaveHandler}
      className="w-full group"
    >
      <div className="w-full">
        <NavLink to={`/product/${_id}`} className="flex w-full relative ">
          <ProgressiveImage
            key={`active-${images[0].imageURL}`}
            className={cx('w-full aspect-[3/4] bg-orange-200', {
              hidden: isSliderActive && images.length > 1,
            })}
            src={images[0].imageURL}
            alt="image"
          />
          {isSliderActive && images.length > 1 && (
            <ImageSlider
              callback={setActiveIndex}
              className={cx('w-full aspect-[3/4]')}
              images={images}
            />
          )}
          {ratings.averageRating && (
            <div className="absolute bottom-5 left-5 bg-white bg-opacity-80 flex items-center">
              <RatingStatus
                className="px-3 py-1.5 "
                rating={ratings.averageRating}
              />
              <div className="w-0.5 h-5 bg-slate-400"></div>
              <div className="px-3 py-1.5">
                {numberFormatter(ratings?.totalCount)}
              </div>
            </div>
          )}
        </NavLink>
        <div className="w-full relative">
          {isSliderActive && (
            <SliderNavigator
              count={images.length}
              activeIndex={activeIndex}
              productId={_id}
            />
          )}
          <div className="w-full flex flex-col gap-y-1.5 mt-3">
            <h5 className="!capitalize">{brand.name}</h5>
            <p className="text-[1.3rem] font-normal text-slate-500 truncate w-full capitalize">
              {name}
            </p>
          </div>
        </div>
      </div>
      <div>
        <NavLink
          to={`/product/${_id}`}
          className="flex items-center gap-x-3 py-1.5"
        >
          {discount && !!discount.discountPercent ? (
            <>
              <h5 className="capitalize">
                Rs. {Math.floor(mrp * (discount.discountPercent / 100))}
              </h5>
              {` `}
              <span className="text-xxs line-through text-slate-500">
                Rs. {mrp}
              </span>
              <span className="text-xxs text-orange-400">{discount.label}</span>
            </>
          ) : (
            <>
              <h5 className="capitalize">Rs. {mrp}</h5>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default ProductThumbnail;
