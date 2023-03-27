import React, { useState } from 'react';
import cx from 'classnames';
import Hr from 'shared/Hr';

interface SpecificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  specifications: { [key: string]: string };
}

const Specifications: React.FC<SpecificationsProps> = ({
  className,
  specifications,
}) => {
  const [moreSpecifications, setMoreSpecifications] = useState(false);

  const specs = {};

  Object.keys(specifications).forEach((key) => {
    if (specifications[key] !== 'NA') {
      specs[key] = specifications[key];
    }
  });

  if (!specs || !Object.keys(specs).length) {
    return null;
  }
  return (
    <div className={cx(className, '')}>
      <h5 className={cx('my-5 text-sm tracking-wide')}>Specifications</h5>
      <div className="grid grid-cols-2 gap-x-14 gap-y-4">
        {Object.keys(specs)
          .slice(0, moreSpecifications ? Object.keys(specs).length : 6)
          .map((key) => {
            if (specs[key] === 'NA') return null;
            return (
              <div key={key} className="flex flex-col gap-y-1.5">
                <div className="text-xs text-gray-400">{key}</div>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: specs[key] }}
                ></div>
                <Hr className="my-2 border-slate-200" />
              </div>
            );
          })}
      </div>
      {Object.keys(specs).length > 6 && (
        <button
          className="mt-2 text-violet-500 text-xs font-medium self-start"
          onClick={() => setMoreSpecifications(!moreSpecifications)}
        >
          {!moreSpecifications ? `Show more` : `Show less`}
        </button>
      )}
    </div>
  );
};

export default Specifications;
