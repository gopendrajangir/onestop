import React from 'react';
import cx from 'classnames';

import DocumentIcon from 'assets/img/icons/document-text.svg';

interface DetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  details: {
    title: 'string';
    description: 'string';
  }[];
}

const Details: React.FC<DetailsProps> = ({ className, details }) => {
  return (
    <div className={cx(className, '')}>
      <div className="flex flex-col gap-y-8">
        {details.map(({ title, description }) => {
          const t = title.toLowerCase();
          return (
            <div key={t} className="flex flex-col gap-y-2">
              <h5
                className={cx('text-sm tracking-wide flex gap-x-2', {
                  capitalize: t !== 'product details',
                })}
              >
                {t}
                {t === 'product details' && <DocumentIcon className="w-8" />}
              </h5>
              <p
                className="text-sm font-light leading-relaxed tracking-wide"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
