import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import resizeImageUrl from 'utils/resizeImageUrl';

import { IVariant } from 'common/types';

interface VariantsProps extends React.HTMLAttributes<HTMLDivElement> {
  variants: IVariant[];
}

const Variants: React.FC<VariantsProps> = ({ className, variants }) => {
  return (
    <div className={cx(className, '')}>
      <h5 className="text-sm tracking-wide mb-5">More Colors</h5>
      <div className="flex flex-wrap gap-5 w-full">
        {variants.map(({ _id, image, baseColor }, i) => {
          image = resizeImageUrl(image, 80, 60, 90);
          return (
            <NavLink key={_id} to={`/product/${_id}`} title={baseColor}>
              <div key={_id} className="h-[8rem] w-[6rem] bg-slate-200">
                <img
                  className="flex h-[8rem] w-[6rem] object-cover"
                  src={image}
                  alt="variant image"
                />
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Variants;
