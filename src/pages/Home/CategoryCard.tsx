import React from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import ProgressiveImage from 'shared/ProgressiveImage';

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  urlParams: URLSearchParams;
  img: string;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  className,
  title,
  urlParams,
  img,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate({
          pathname: '/search',
          search: '?' + urlParams,
        });
      }}
      className={cx(
        className,
        'flex flex-col items-center gap-5 rounded-md px-10 group'
      )}
    >
      <div className="w-36 h-36 overflow-hidden rounded-full flex items-center justify-center">
        <ProgressiveImage
          className="w-full h-full transition-all group group-hover:scale-110 rounded-full object-cover"
          src={img}
          alt="shopping image"
        />
      </div>
      <h5 className="leading-tight w-max capitalize text-slate-800">{title}</h5>
    </button>
  );
};

export default CategoryCard;
