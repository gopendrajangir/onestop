import { NavigateFunction } from "react-router-dom";
import { parseSearchParams, stringifySearchParams } from "./searchParamsUtils";

const onFilterSelect: (
  params: URLSearchParams,
  key: string,
  _id: string,
  selected: boolean,
  navigate: NavigateFunction,
  isRadio?: boolean,
  range?: { min: number; max: number }
) => void = (params, key, _id, selected, navigate, isRadio, range) => {

  const searchParams = parseSearchParams(params);

  if (!range) {
    if (!searchParams.filters.text[key]) {
      searchParams.filters.text[key] = [];
    }
    if (!isRadio) {
      if (selected) {
        searchParams.filters.text[key] = searchParams.filters.text[
          key
        ].filter((value) => {
          if (_id === value) {
            return false;
          }
          return true;
        });

        if (!searchParams.filters.text[key].length) {
          delete searchParams.filters.text[key];
        }
      } else {
        searchParams.filters.text[key].push(_id);
      }
    } else {
      searchParams.filters.text[key] = [_id];
    }
  } else {
    if (!searchParams.filters.range[key]) {
      searchParams.filters.range[key] = [];
    }
    if (!isRadio) {
      if (selected) {
        searchParams.filters.range[key] = searchParams.filters.range[
          key
        ].filter(({ min, max }) => {
          if (range.min === min && range.max === max) {
            return false;
          }
          return true;
        });

        if (!searchParams.filters.range[key].length) {
          delete searchParams.filters.range[key];
        }
      } else {
        searchParams.filters.range[key].push(range);
      }
    } else {
      searchParams.filters.range[key] = [range];
    }
  }

  searchParams.page = 1;

  navigate({
    pathname: '/search',
    search: '?' + stringifySearchParams(searchParams),
  });
};

export default onFilterSelect