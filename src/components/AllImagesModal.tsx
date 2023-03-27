import React, { useContext } from 'react';
import cx from 'classnames';

import Modal from 'shared/Modal';
import PhotosList from './PhotosList';

import { productContext } from 'context/productContext';

import { IReview } from 'common/types';

interface AllImagesModalProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: IReview[];
}

const AllImagesModal: React.FC<AllImagesModalProps> = ({
  className,
  reviews,
}) => {
  const { setShowAllImages } = useContext(productContext);

  return (
    <Modal onClose={() => setShowAllImages(false)}>
      <div className="rounded-md flex flex-col items-center p-10 max-w-[50rem] overflow-y-auto max-h-50rem bg-white">
        <h3>User Reviews Photos</h3>
        <div className="flex flex-wrap p-10 rounded bg-white gap-5">
          <PhotosList reviews={reviews} />
        </div>
      </div>
    </Modal>
  );
};

export default AllImagesModal;
