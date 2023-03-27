import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

import FilterIcon from 'assets/img/icons/tune.svg';

import SearchError from './SearchError';
import Products from './Products';
import FiltersSidebar from 'components/FiltersSidebar';
import SelectedFilters from 'components/SelectedFilters';
import FiltersTopbar from 'components/FiltersTopbar';
import Pagination from 'components/Pagination';
import BreadCrumb from 'components/BreadCrumb';
import PageLoader from 'shared/PageLoader';

import { productsContext } from 'context/productsContext';

import {
  parseSearchParams,
  stringifySearchParams,
} from 'utils/searchParamsUtils';

interface SearchPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchPage: React.FC<SearchPageProps> = (props) => {
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  const {
    total,
    filters,
    selectedFilters,
    products,
    isLoading,
    error,
    queryObject,
  } = useContext(productsContext);

  const limit = searchParams.get('limit')
    ? parseInt(searchParams.get('limit'))
    : 15;
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1;
  const totalPages =
    total % limit === 0
      ? Math.floor(total / limit)
      : Math.floor(total / limit) + 1;

  const containerRef = useRef<HTMLDivElement>();

  const navigate = useNavigate();

  const onPageSelect = (page) => {
    const params = parseSearchParams(searchParams);
    params.page = page;
    navigate({
      pathname: '/search',
      search: '?' + stringifySearchParams(params),
    });
  };

  if (!isLoading && error && axios.isAxiosError(error)) {
    if (!error.response) {
      return <SearchError errorCode={500} message={error.message} />;
    }
    return (
      <SearchError
        errorCode={error.response.status}
        message={error.response.data.error}
      />
    );
  }

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTo(0, 0);
  }, [products]);

  return (
    <div ref={containerRef}>
      {isLoading && <PageLoader />}
      {products && (
        <>
          {!products.length ? (
            <SearchError
              errorCode={404}
              message={`No products found for - ${searchParams.get('query')}`}
            />
          ) : (
            <>
              <div className="p-5 sm:p-12 sm:pb-8">
                <BreadCrumb
                  queryObject={queryObject}
                  analytics={products[0].analytics}
                  className="mb-8"
                />
                <div className="flex items-center">
                  <h5 className="capitalize text-md">
                    {searchParams.get('query')}
                  </h5>
                  &nbsp;
                  <span className="text-md text-slate-500 font-light">
                    - {total && ` ${total} items`}
                  </span>
                </div>
              </div>
              <div className="flex max-h-max items-start relative md:mt-0">
                {filters && (
                  <div className="sticky top-0 w-96 h-[calc(100vh-7rem)] hidden md:block">
                    <FiltersSidebar filters={filters.primary} />
                  </div>
                )}
                <div className="">
                  {filters && <FiltersTopbar filters={filters.secondary} />}
                  {selectedFilters && (
                    <SelectedFilters filters={selectedFilters} />
                  )}
                  {filters && (
                    <div className="bg-white z-10 sticky py-4 top-0 right-0 flex justify-end pr-5 md:hidden">
                      <button
                        onClick={() => {
                          setShowFilter(true);
                        }}
                        className="flex items-center gap-x-3 border border-slate-300 rounded-full px-5 py-2 text-xs uppercase font-medium"
                      >
                        <FilterIcon className="w-7 fill-slate-500" />
                        <span className="text-slate-500">Filters</span>
                      </button>
                    </div>
                  )}
                  {showFilter && (
                    <>
                      <button
                        onClick={() => {
                          setShowFilter(false);
                        }}
                        className="w-screen lg:max-w-[1440px] h-screen fixed top-[7rem] left-0 bg-black bg-opacity-40"
                      ></button>
                      <div className="fixed top-[7rem] right-1 w-96 h-[calc(100vh-7rem)] bg-white border-l">
                        <FiltersSidebar filters={filters.primary} />
                      </div>
                    </>
                  )}
                  {products && (
                    <Products products={products} className="p-5 sm:p-20" />
                  )}
                  <Pagination
                    page={page}
                    limit={limit}
                    totalPages={totalPages}
                    onPageSelect={onPageSelect}
                    className="mt-10 mb-20 px-5 sm:px-20"
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
