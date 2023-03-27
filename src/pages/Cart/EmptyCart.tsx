import React from 'react';
import cx from 'classnames';

import BagIcon from 'assets/img/icons/shopping-bag.svg';
import Button from 'shared/Button';
import { useNavigate } from 'react-router-dom';

interface EmptyCartProps extends React.HTMLAttributes<HTMLDivElement> {}

const EmptyCart: React.FC<EmptyCartProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cx(
        className,
        'flex flex-col justify-center items-center w-full h-full'
      )}
    >
      <BagIcon className="h-40 w-40 fill-slate-400 mb-10 rotate-12" />
      <p className="mt-8 mb-2 font-bold text-slate-700 text-xl">
        Hey, it feels so light!
      </p>
      <p className="text-xs text-slate-400">
        There's nothing in your bag. Lets add some items
      </p>
      <Button
        onClick={() => navigate('/auth/wishlist')}
        className="border-violet-500 hover:border-violet-400 text-violet-500 hover:text-violet-400 font-medium mt-10"
        variant="outline"
      >
        Add items from wishlist
      </Button>
    </div>
  );
};

export default EmptyCart;
