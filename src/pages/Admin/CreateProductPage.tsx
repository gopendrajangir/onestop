import CreateProductForm from 'components/CreateProductForm';
import React from 'react';

interface CreateProductPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateProductPage: React.FC<CreateProductPageProps> = (props) => {
  return (
    <div>
      <h1 className="text-[3rem] text-center border-b pb-10">Create Product</h1>
      <CreateProductForm className="mt-20" />
    </div>
  );
};

export default CreateProductPage;
