import { stringifySearchParams } from "./searchParamsUtils";

export default (query, rangeFilters = {}, textFilters = {}, sort = { 'ratings.totalCount': -1, 'ratings.averageRating': -1 }) => {
  const params = {
    query,
    filters: {
      text: {},
      range: rangeFilters,
    },
    page: 1,
    limit: 15,
    sort
  };



  return stringifySearchParams(params);
}