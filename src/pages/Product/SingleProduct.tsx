import { useReducer, useState } from 'react';
import cx from 'classnames';

import RatingsIcon from 'assets/img/icons/star_half.svg';
import ArrowRightIcon from 'assets/img/icons/chevron-right.svg';

import RatingStatus from 'shared/RatingStatus';
import Button from 'shared/Button';
import Hr from 'shared/Hr';
import BreadCrumb from 'components/BreadCrumb';
import RatingInfo from 'components/RatingInfo';
import Sizes from 'components/Sizes';
import AnimatedError from 'shared/AnimatedError';
import UserReviews from './UserReviews';
import CustomerPhotos from './CustomerPhotos';
import Specifications from './Specifications';
import Details from './Details';

import numberFormatter from 'utils/numberFormatter';

import { IProduct } from 'common/types';
import Variants from './Variants';
import ProductImages from './ProductImages';

import { addToCart } from 'redux/slices/cart/thunks';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import WishlistButton from 'shared/WishlistButton';
import AddToBagButton from 'shared/AddToBagButton';

interface SingleProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: IProduct;
}

function sizeReducer(state, action) {
  const skuId = action.payload;
  switch (action.type) {
    case 'select_size':
      if (!state[skuId]) {
        return { ...state, [skuId]: false };
      }
    case 'bag_touched':
      return { ...state, [skuId]: true };

    default:
      return state;
  }
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>();
  const [isTouched, setIsTouched] = useState(false);
  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {});

  const dispatch = useAppDispatch();

  const {
    media: { albums },
    mrp,
    brand,
    name,
    ratings,
    discount,
    variants,
    skus,
    details,
    specifications,
    reviews,
  } = product;

  const navigate = useNavigate();

  const addedToBag = sizeState[selectedSize];

  return (
    <div className="p-10">
      <BreadCrumb analytics={product.analytics} isSingleProduct />
      <div className="mt-10 flex flex-col md:flex-row gap-y-10">
        <ProductImages images={albums[0].images} />
        <div className="flex flex-col px-2 md:px-10 max-w-[50rem]">
          <h3 className="capitalize">{brand.name}</h3>
          <div className="text-lg text-slate-500 font-light tracking-wide">
            {name}
          </div>
          {ratings && !!ratings.averageRating && !!ratings.totalCount && (
            <div className="text-sm border border-slate-200 flex self-start p-2 px-4 gap-x-4 text-slate-700 mt-4">
              <RatingStatus className="" rating={ratings.averageRating} />
              <div className="w-0.5 bg-slate-200"></div>
              <div className="flex items-center">{`${numberFormatter(
                ratings.totalCount
              )} Ratings`}</div>
            </div>
          )}
          <Hr />
          <div className="flex items-end gap-x-8">
            {discount && !!discount.discountPercent ? (
              <>
                <div className="flex items-end gap-x-1">
                  <h5 className="text-3xl leading-none">&#8377;</h5>
                  <h5 className="text-2xl leading-none">
                    {Math.floor(mrp * (discount.discountPercent / 100))}
                  </h5>
                </div>
                <div className="flex items-center gap-x-2 text-slate-500 font-light">
                  <div className="text-xl leading-none">MRP</div>
                  <div className="relative flex items-center">
                    <span className="text-xl leading-none">&#8377;</span>
                    <span className="text-lg leading-none">{mrp}</span>
                    <div className="absolute h-0.5 w-full bg-slate-500"></div>
                  </div>
                </div>
                <div className="tracking-wide text-md font-bold text-orange-400">
                  {discount.label}
                </div>
              </>
            ) : (
              <div className="flex items-end gap-x-1">
                <h5 className="text-3xl leading-none">&#8377;</h5>
                <h5 className="text-2xl leading-none">{mrp}</h5>
              </div>
            )}
          </div>
          <span className="text-xs font-bold text-green-600 mt-4 tracking-wide">
            inclusive of all taxes
          </span>
          {variants && !!variants.length && (
            <Variants variants={variants} className="mt-8" />
          )}
          <div className="mt-12">
            <div className="flex gap-x-16">
              <h5 className="text-sm tracking-wide">Select Size</h5>
              <button className="flex items-center text-sm uppercase font-medium tracking-wide text-violet-500">
                Size Chart <ArrowRightIcon className="h-6 fill-violet-500" />
              </button>
            </div>
            {!selectedSize && isTouched && (
              <AnimatedError className="mt-5" message="Please select a size" />
            )}
            <Sizes
              className="mt-10"
              skus={skus}
              shake={!selectedSize && isTouched}
              selectedSize={selectedSize}
              setSelectedSize={(_id: string) => {
                sizeDispatch({
                  type: 'select_size',
                  payload: _id,
                });
                setSelectedSize(_id);
              }}
            />
          </div>
          <div className="flex w-full mt-10 gap-x-4">
            <AddToBagButton
              addedToBag={addedToBag}
              onClick={() => {
                if (selectedSize && !addedToBag) {
                  dispatch(addToCart(selectedSize)).then((res) => {
                    if (res.type !== 'cart/addItem/rejected') {
                      sizeDispatch({
                        type: 'bag_touched',
                        payload: selectedSize,
                      });
                    }
                  });
                }
                if (addedToBag) {
                  navigate('/auth/cart');
                }
                setIsTouched(true);
              }}
              className="flex-1"
            />
            <WishlistButton productId={product._id} className="flex-1" />
          </div>
          <Hr className="my-10" />
          {details && !!details.length && <Details details={details} />}
          <Hr />
          <Specifications specifications={specifications} />
          <Hr className="!my-10" />
          {ratings && !!ratings.averageRating && (
            <div>
              <h5
                className={cx(
                  'flex items-center gap-x-2 my-5 text-sm tracking-wide'
                )}
              >
                Ratings
                <RatingsIcon className="w-8" />
              </h5>
              <div className="mt-14">
                <div className="flex gap-x-20">
                  <RatingStatus
                    rating={ratings.averageRating}
                    iconClassName="!h-10"
                    className="text-5xl"
                  />
                  <div className="w-0.5 bg-slate-300"></div>
                  {ratings.ratingInfo && (
                    <RatingInfo
                      ratingInfo={ratings.ratingInfo}
                      totalCount={ratings.totalCount}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          <CustomerPhotos reviews={reviews} />
          {reviews && !!reviews.length && <UserReviews reviews={reviews} />}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
