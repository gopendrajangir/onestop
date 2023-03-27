import React from 'react';
import cx from 'classnames';

import BagIcon from 'assets/img/icons/shopping-bag.svg';
import ArrowRightIcon from 'assets/img/icons/arrow-right.svg';

import Button, { ButtonProps } from './Button';

interface AddToBagButtonProps extends ButtonProps {
  addedToBag?: boolean;
}

const AddToBagButton: React.FC<AddToBagButtonProps> = ({
  className,
  children,
  addedToBag,
  ...props
}) => {
  return (
    <Button
      className={cx(className, 'text-sm font-medium h-20 px-6 rounded-md')}
      {...props}
    >
      {addedToBag ? (
        <>
          <span className="leading-none ">GO TO BAG</span>
          <ArrowRightIcon className="w-6 fill-white" />
        </>
      ) : (
        <>
          <BagIcon className="w-6 fill-white mb-0.5" />
          <span className="leading-none ">ADD TO BAG</span>
        </>
      )}
    </Button>
  );
};

export default AddToBagButton;
