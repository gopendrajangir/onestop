import { createSearchParams } from "react-router-dom";
import encodeString from "./encodeString";

export const urlParamMappings = {
  ftb: 'analytics.brand',
  ftg: 'analytics.gender',
  ftt: 'analytics.articleType',
  ftc: 'baseColor',
  frm: 'mrp',
  frd: 'discount.discountPercent',
  ftco: 'countryOfOrigin',
  frr: 'ratings.averageRating',
  'analytics.brand': "ftb",
  'analytics.gender': "ftg",
  'analytics.articleType': "ftt",
  'baseColor': "ftc",
  'mrp': "frm",
  'discount.discountPercent': "frd",
  'countryOfOrigin': 'ftco',
  'ratings.averageRating': 'frr',

  discount: 'discount.discountPercent,-1',
  rating: 'ratings.totalCount,-1|ratings.averageRating,-1',
  price_asc: 'mrp,1',
  price_desc: 'mrp,-1',
  'discount.discountPercent,-1': 'discount',
  'ratings.totalCount,-1|ratings.averageRating,-1': 'rating',
  'mrp,1': 'price_asc',
  'mrp,-1': 'price_desc',
};

export const maualQueryUrlParamMappings = {
  qtt: 'analytics.articleType',
  qts: 'analytics.subCategory',
  qtm: 'analytics.masterCategory',
  'analytics.articleType': "qtt",
  'analytics.subCategory': "qts",
  'analytics.masterCategory': "qtm"
};

export interface TextFilterValue {
  _id: string,
  count: number,
  selected: boolean
}

export interface RangeFilterValue {
  _id: string,
  count: number,
  selected: boolean
  range: {
    min: number,
    max: number,
  }
}

export interface SelectedFiltersType {
  [key: string]: {
    title: string;
    abbr: string;
    values: {
      _id: string,
      count: number,
      selected: true,
      range?: {
        min: number;
        max: number;
      }
    }[]
  }
}

export interface TextFilter {
  title: string,
  abbr: string,
  values: TextFilterValue[]
}

export interface RangeFilter {
  title: string,
  abbr: string,
  values: RangeFilterValue[]
}

export interface Filters {
  text: { [key: string]: TextFilter },
  range: { [key: string]: RangeFilter }
}

export interface FiltersResponse {
  primary: Filters,
  secondary: Filters,
}

export interface ParsedFilters {
  text: {
    [key: string]: string[]
  },
  range: {
    [key: string]: { min: number, max: number }[]
  },
}

export interface ParsedSearchParams {
  query?: string;
  sort?: { [key: string]: number };
  page: number;
  limit: number;
  filters: ParsedFilters;
  manual?: boolean;
  manualQueries?: {
    [key: string]: string[]
  }
};

export function stringifySearchParams(params: ParsedSearchParams) {
  const obj = {};

  Object.keys(params).forEach(key => {
    if (key === 'filters') {
      Object.keys(params[key].text).forEach(k => {
        params[key].text[k] = params[key].text[k].map(v => {
          return encodeString(v);
        })
        obj[urlParamMappings[k]] = (params[key].text[k] as string[]).join(',');
      });

      Object.keys(params[key].range).forEach(k => {
        obj[urlParamMappings[k]] = params[key].range[k].map(({ min, max }) => `min:${min}&max:${max}`).join(',');
      })
    } else if (key === 'sort') {
      const keys = Object.keys(params[key]);
      const values = Object.values(params[key]);

      const sortArr = keys.map((key, i) => {
        return `${keys[i]},${values[i]}`;
      })

      obj[key] = urlParamMappings[sortArr.join('|')]

    } else if (key === 'manual' && params[key]) {
      obj[key] = true;
    } else if (key === 'manualQueries') {
      Object.keys(params[key]).forEach((k) => {
        obj[maualQueryUrlParamMappings[k]] = params[key][k].join(',');
      })
    } else {
      obj[key] = params[key]
    }
  })

  return createSearchParams(obj);
}

export function parseSearchParams(params: URLSearchParams) {
  const entries = Array.from(params.entries());

  const obj: ParsedSearchParams = {
    query: '',
    page: 1,
    limit: 15,
    filters: {
      text: {},
      range: {}
    },
    manual: false,
    manualQueries: {}
  };

  entries.forEach(([key, value]) => {
    if (key.substring(0, 2) === 'ft') {
      key = urlParamMappings[key];
      obj.filters.text[key] = value.split(',');
    } else if (key.substring(0, 2) === 'fr') {
      key = urlParamMappings[key];
      obj.filters.range[key] = value.split(',').map((item) => {
        const range = { min: 0, max: 0 };
        item.split('&').map((pair) => {
          const [key, value] = pair.split(':');
          range[key] = JSON.parse(value);
        });
        return range;
      });
    } else if (key === 'sort') {
      const sortObj = {}

      const sortKey = params.get(key);

      if (urlParamMappings[sortKey]) {

        const sortArr = urlParamMappings[sortKey]
          .split('|')
          .map((str) => str.split(','))


        sortArr.map(([key, value]) => { sortObj[key] = parseInt(value) });

        obj.sort = sortObj;

      }

    } else if (key === 'query') {
      obj[key] = value
    } else if (key === 'manual') {
      obj[key] = value === "true" ? true : false;
    } else if (key.substring(0, 2) === 'qt') {
      key = maualQueryUrlParamMappings[key];
      obj.manualQueries[key] = value.split(',');
    } else {
      obj[key] = parseInt(value);
    }
  });

  return obj;
}
