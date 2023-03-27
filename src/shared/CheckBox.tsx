import React from 'react';
import cx from 'classnames';

import CheckIcon from 'assets/img/icons/checkmark.svg';
import MinusIcon from 'assets/img/icons/minus.svg';

interface CheckBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  partialSelected?: boolean;
  isRadio?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  selected,
  partialSelected,
  isRadio,
}) => {
  return (
    <div
      className={cx(
        'h-6 w-6 border border-gray-300 rounded flex-shrink-0',
        {
          '!bg-violet-500 border-none':
            (selected || partialSelected) && !isRadio,
        },
        {
          'rounded-full border border-gray-400 h-6 w-6': isRadio,
        },
        {
          '!border-violet-500': (selected || partialSelected) && isRadio,
        },
        className
      )}
    >
      <span
        className={cx(
          'flex justify-center items-center  h-full w-full relative'
        )}
      >
        {(selected || partialSelected) &&
          (isRadio ? (
            <span className=" bg-violet-500 h-[7px] w-[7px] rounded-full"></span>
          ) : !partialSelected ? (
            <CheckIcon className="h-full w-full fill-white" />
          ) : (
            <MinusIcon className="h-full w-full fill-white" />
          ))}
      </span>
    </div>
  );
};

export default CheckBox;
