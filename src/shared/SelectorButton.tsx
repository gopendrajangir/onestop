import React from 'react';
import cx from 'classnames';

interface SelectorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  selected?: boolean;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({
  className,
  text,
  selected,
  ...props
}) => {
  var regExp = /[a-zA-Z]/g;

  const isAlphaNumeric = regExp.test(text);

  return (
    <button
      className={cx(
        'flex justify-center items-center text-xs font-medium w-max rounded-full border border-slate-300 hover:border-violet-500',
        {
          '!w-20 !h-20': !isAlphaNumeric || text.toString().length < 4,
          'h-20 px-7 py-1.5': isAlphaNumeric && text.toString().length >= 4,
          'border-violet-500 text-violet-500': selected,
        },
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default SelectorButton;
