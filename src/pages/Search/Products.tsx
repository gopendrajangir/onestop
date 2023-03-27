import React from 'react';

import ProductThumbnail from 'components/ProductThumbnail';

import { IProduct } from 'common/types';

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: IProduct[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-20 p-20">
      {products.map((product) => {
        return <ProductThumbnail key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
