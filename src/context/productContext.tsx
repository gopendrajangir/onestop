import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import ReviewImagesSlider from 'components/ReviewImagesSlider';
import AllImagesModal from 'components/AllImagesModal';

import { IProduct, IReview } from 'common/types';

interface IProductContext {
  product: IProduct;
  isLoading: boolean;
  error: unknown;
  setSelectedReviewIdx: React.Dispatch<React.SetStateAction<number>>;
  setSelectedReviewNestedIdx: React.Dispatch<React.SetStateAction<number>>;
  setSelectedReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
  setShowSlider: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAllImages: React.Dispatch<React.SetStateAction<boolean>>;
}

const productDefualtValue: IProductContext = {
  product: null,
  isLoading: false,
  error: null,
  setSelectedReviewIdx: () => null,
  setSelectedReviewNestedIdx: () => null,
  setSelectedReviews: () => null,
  setShowSlider: () => null,
  setShowAllImages: () => null,
};

const productContext =
  React.createContext<IProductContext>(productDefualtValue);

const ProductContextProvider = ({ children }) => {
  const [selectedReviews, setSelectedReviews] = useState<IReview[]>();
  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number>();
  const [selectedReviewNestedIdx, setSelectedReviewNestedIdx] =
    useState<number>();
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [showAllImages, setShowAllImages] = useState<boolean>(false);

  const { id } = useParams();

  const { data, isLoading, error } = useQuery(
    ['fetch-product', id],
    () => {
      return axios.get(`/products/${id}`);
    },
    {
      refetchInterval: false,
    }
  );

  const product: IProduct = data?.data?.product;

  return (
    <productContext.Provider
      value={{
        product,
        isLoading,
        error,
        setSelectedReviewIdx,
        setSelectedReviewNestedIdx,
        setSelectedReviews,
        setShowSlider,
        setShowAllImages,
      }}
    >
      {children}
      {showAllImages && <AllImagesModal reviews={selectedReviews} />}
      {showSlider && (
        <ReviewImagesSlider
          reviews={selectedReviews}
          currentIdx={selectedReviewIdx}
          currentNestedIdx={selectedReviewNestedIdx}
          onClose={() => setShowSlider(false)}
        />
      )}
    </productContext.Provider>
  );
};

export { productContext, ProductContextProvider };
