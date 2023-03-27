import React from 'react';
import cx from 'classnames';
import ProgressiveImage from 'shared/ProgressiveImage';
import Hr from 'shared/Hr';

interface ConfirmationModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  heading: string;
  description: string;
}

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  className,
  image,
  children,
  heading,
  description,
}) => {
  return (
    <div className={cx(className, 'bg-white p-4 rounded w-[34rem]')}>
      <div className="flex gap-4">
        {image && (
          <ProgressiveImage
            className="h-[8rem] aspect-[3/4]"
            src={image}
            alt="product image"
          />
        )}
        <div className="flex flex-col">
          <h6 className="capitalize font-bold">{heading}</h6>
          <p className="text-xs  max-w-sm text-slate-700">{description}</p>
        </div>
      </div>
      <Hr className="mt-4 mb-0 !border-slate-300" />
      <div className="flex mt-4">{children}</div>
    </div>
  );
};

export default ConfirmationModalContent;
