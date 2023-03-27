import React, { useContext } from 'react';
import cx from 'classnames';

import SingleProduct from './SingleProduct';
import { productContext } from 'context/productContext';
import PageLoader from 'shared/PageLoader';
import { useAppSelector } from 'hooks/useAppSelector';

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {}

const Product: React.FC<ProductProps> = ({ className }) => {
  const { isLoading, product } = useContext(productContext);
  const cartLoading = useAppSelector((state) => state.cart.loading);

  return (
    <div className={cx(className, 'w-full')}>
      {(isLoading || cartLoading) && <PageLoader />}
      {product && <SingleProduct className="" product={product} />}
    </div>
  );
};

export default Product;
