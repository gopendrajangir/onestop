import React, { useCallback, useRef, useState } from 'react';
import cx from 'classnames';
import { createSearchParams, useNavigate } from 'react-router-dom';

import SearchIcon from 'assets/img/icons/search.svg';
import ClearIcon from 'assets/img/icons/clear.svg';

import Input from 'components/FormElements/Input';
import AutoComplete from './AutoComplete';
import ClickAwayListener from 'shared/ClickAwayListener';

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

type TimeoutType = ReturnType<typeof setTimeout>;

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [query, setQuery] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [timer, setTimer] = useState<TimeoutType>(null);

  const inputRef = useRef();

  const navigate = useNavigate();

  const enableAutoComplete = useCallback(() => {
    clearTimeout(timer);
    const t = setTimeout(() => {
      setShowAutoComplete(true);
    }, 500);
    setTimer(t);
  }, [timer]);

  const submitHandler = useCallback(
    (query) => {
      if (query) {
        setQuery('');
        navigate({
          pathname: '/search',
          search:
            '?' +
            createSearchParams({
              query,
            }),
        });
      }
    },
    [query]
  );

  return (
    <form
      aria-label="Signup form"
      className={cx(
        'flex relative bg-violet-50 items-center rounded',
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(query);
      }}
    >
      <button
        onClick={(e) => {
          if (!query) {
            e.preventDefault();
          }
        }}
      >
        <SearchIcon className="w-8 h-8 ml-5 fill-slate-500 flex-shrink-0" />
      </button>
      <Input
        ref={inputRef}
        type="text"
        placeholder="What you want to buy?"
        className="border-none bg-transparent placeholder:text-slate-500 focus:!shadow-none text-[1.3rem] text-slate-700 min-w-0 flex-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          enableAutoComplete();
          setShowAutoComplete(false);
          setQuery(e.target.value);
        }}
        value={query}
      />
      {showAutoComplete && !!query && (
        <ClickAwayListener
          onClickAway={() => setShowAutoComplete(false)}
          avoidableRef={inputRef}
        >
          <AutoComplete
            className="absolute top-full max-w-full w-full bg-white"
            query={query}
            onItemSelect={(item) => {
              submitHandler(item);
            }}
          />
        </ClickAwayListener>
      )}
      {!!query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="flex-shrink-0 mr-3"
        >
          <ClearIcon className="w-8 h-8 fill-slate-500" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
