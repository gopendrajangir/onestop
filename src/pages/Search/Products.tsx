import React from 'react';
import cx from 'classnames';

import ProductThumbnail from 'components/ProductThumbnail';

import { IProduct } from 'common/types';

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: IProduct[];
}

const Products: React.FC<ProductsProps> = ({ products, className }) => {
  return (
    <div
      className={cx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-20',
        className
      )}
    >
      {products.map((product) => {
        return <ProductThumbnail key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
