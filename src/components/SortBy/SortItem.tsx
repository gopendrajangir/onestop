import React from 'react';
import cx from 'classnames';

interface SortItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  title: string;
  onSelect: () => void;
}

const SortItem: React.FC<SortItemProps> = ({
  className,
  selected,
  title,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={cx(
        'text-start p-4 hover:bg-slate-100 cursor-pointer',
        {
          'font-medium bg-slate-100': selected,
        },
        className
      )}
    >
      {title}
    </button>
  );
};

export default SortItem;
