import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import {
  FiltersResponse,
  parseSearchParams,
  SelectedFiltersType,
} from 'utils/searchParamsUtils';

import { IQueryObject } from 'common/types';

interface ProductsContextType {
  filters?: FiltersResponse;
  selectedFilters?: SelectedFiltersType;
  products?: any;
  isLoading?: boolean;
  error?: AxiosError | Error;
  total?: number;
  queryObject?: IQueryObject;
}

const productsDefualtValue: ProductsContextType = {
  filters: null,
  queryObject: null,
  selectedFilters: null,
  products: null,
  total: null,
  isLoading: false,
  error: null,
};

const productsContext =
  React.createContext<ProductsContextType>(productsDefualtValue);

const ProductsContextProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FiltersResponse>();
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>();
  const [products, setProducts] = useState<any>();
  const [total, setTotal] = useState<number>();
  const [queryObject, setQueryObject] = useState<IQueryObject>();

  const { data, isLoading, error, isError } = useQuery<any, AxiosError | Error>(
    ['fetch-products', searchParams.toString()],
    () => {
      return axios.post(
        `http://localhost:8000/products/search`,
        {
          ...parseSearchParams(searchParams),
          includeFilters: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
    {
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    if (!isLoading && data && data.data) {
      if (data.data.selectedFilters) {
        setSelectedFilters(data.data.selectedFilters);
      }
      if (data.data.filters) {
        setFilters(data.data.filters);
      }
      if (data.data.products) {
        setProducts(data.data.products);
      }
      if (data.data.total) {
        setTotal(data.data.total);
      }
      if (data.data.queryObject) {
        setQueryObject(data.data.queryObject);
      }
    }
  }, [isLoading, data]);

  return (
    <productsContext.Provider
      value={{
        filters,
        selectedFilters,
        products,
        isLoading,
        error,
        total,
        queryObject,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export { productsContext, ProductsContextProvider };
