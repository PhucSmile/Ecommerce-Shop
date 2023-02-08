import React, { useEffect, useState } from 'react';
import { Container } from '@/component/common';
import Loading from '@/component/common/Loading';
import Select from '@/component/select/Select';
import { useAllCategoriesApi, useFilterCategoryApi } from '@/hook/useCategoryApi';
import { useSearchApi } from '@/hook/useProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import ProductCart from '@/component/product/ProductCart';

const listSortPrice = ['Sort', 'Reverse'];
const SearchPage = () => {
    const [dataSearch, setDataSearch] = useState();
    // paginate
    const [page, setPage] = useState(12);
    const [pageNumber, setPageNumber] = useState(0);
    const [isCheckedPagination, setIsCheckedPagination] = useState(false);
    // select
    const [selectedCategories, setSelectedCategories] = useState('Select category');
    const [selectedPrice, setSelectedPrice] = useState('Sort');
    const router = useRouter();
    const params = {
        ...router.query,
    };
    const resultSearch = useSelector((state) => state.search.search);

    // fetch data query
    const { data: dataCategories } = useAllCategoriesApi();
    const useSearchMutate = useSearchApi();
    const useSearchCategoriesMutate = useFilterCategoryApi();
    const queryClient = useQueryClient();

    useEffect(() => {
        (async () => {
            try {
                const params = {
                    q: resultSearch,
                };
                await useSearchMutate.mutate(params, {
                    onSuccess: (res) => {
                        queryClient.refetchQueries();
                        setDataSearch(res?.data.products);
                        setIsCheckedPagination(false);
                        setPage(12);
                        setPageNumber(res?.data.total);
                    },
                    onError: (err) => {
                        console.log('error', err);
                    },
                });
            } catch (error) {}
        })();
    }, [resultSearch]);

    const handleReset = () => {
        setSelectedCategories('Select category');
        setSelectedPrice('Sort');
    };
    const handleStopFilter = async () => {
        router.push('/search');
        const params = {
            q: '',
        };
        try {
            await useSearchMutate.mutate(params, {
                onSuccess: (res) => {
                    queryClient.refetchQueries();
                    setDataSearch(res?.data.products);
                    // setPageNumber(res?.data.total)
                    setPageNumber(res?.data.total);
                },
                onError: (err) => {
                    console.log('error', err);
                },
            });
        } catch (error) {}
    };
    const handleFilterSearch = async () => {
        try {
            if (selectedCategories !== 'Select category') {
                const params = {
                    category: selectedCategories,
                };
                await useSearchCategoriesMutate.mutate(params, {
                    onSuccess: (res) => {
                        queryClient.refetchQueries();
                        setDataSearch(res?.data.products);
                        setIsCheckedPagination(true);
                        setPage(12);
                        setPageNumber(res?.data.total);

                        // setPageNumber(res?.data.total)
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlePagination = async () => {
        let params = {};
        setPage((prev) => prev + 12);
        try {
            if (resultSearch === '' && selectedCategories === 'Select category' && !isCheckedPagination) {
                params = {
                    q: '',
                    skip: page,
                };
            } else if (selectedCategories !== 'Select category' && isCheckedPagination) {
                params = {
                    skip: page,
                    category: selectedCategories,
                };
            } else {
                params = {
                    q: resultSearch,
                    skip: page,
                };
            }

            if (!params.category && !isCheckedPagination) {
                await useSearchMutate.mutate(params, {
                    onSuccess: (res) => {
                        setDataSearch((prev) => [...prev, ...res?.data?.products]);
                        setPageNumber(res?.data.total);
                    },
                    onError: (err) => {},
                });
            } else {
                await useSearchCategoriesMutate.mutate(params, {
                    onSuccess: (res) => {
                        setDataSearch(res?.data.products);
                        setPageNumber(res?.data.total);

                        // setPageNumber(res?.data.total)
                    },
                    onError: (err) => {},
                });
            }
        } catch (error) {}
    };

    return (
        <Container>
            <div className="grid grid-cols-3 gap-[122px] ">
                {/* left */}
                <div></div>

                {/* right */}
                <div className="col-span-2  w-full my-[28px]">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xl font-medium">Search results for “{params.q}”</h4>
                        <span className="text-xs font-normal"> {dataSearch?.total} Result </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-[122px] w-full ">
                {/* left */}
                <div className="max-h-[731px] mb-[316px]  w-full shadow-[0px_8px_8px_#656d7826]">
                    <h3 className="font-bold text-xl pl-[10px] py-[10px] bg-[#F3F4F9]">Bộ lọc tìm kiếm</h3>
                    <div className="px-4 pt-4 ">
                        {/* input search */}
                        {/* <div className="flex flex-col mb-4">
                            <label htmlFor="search" className="text-sm font-semibold mb-2">
                                Search
                            </label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Search...."
                                className="block shadow-md w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none  sm:text-sm"
                            />
                        </div> */}
                        {/*search categories */}
                        <Select
                            data={dataCategories?.data}
                            title="Categories"
                            selected={selectedCategories}
                            setSelected={setSelectedCategories}
                        />

                        {/* sort price */}
                        <Select
                            data={listSortPrice}
                            title="Sort price"
                            selected={selectedPrice}
                            setSelected={setSelectedPrice}
                        />

                        <div className="flex justify-end items-center gap-[16px] mt-5 mb-[303px]">
                            <span className=" cursor-pointer px-1 py-1 hover:font-semibold" onClick={handleReset}>
                                Reset
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] py-6 gap-2">
                        <button className="btn-outline px-[40px]" onClick={handleStopFilter}>
                            Bỏ lọc
                        </button>
                        <button className="btn-primary px-[40px]" onClick={handleFilterSearch}>
                            Filter
                        </button>
                    </div>
                </div>

                {/* right */}
                <div className="col-span-2  w-full ">
                    <div className="grid grid-cols-4 gap-[20px]">
                        {selectedPrice === 'Sort'
                            ? dataSearch
                                  ?.concat()
                                  .sort()
                                  .map((product) => {
                                      return <ProductCart key={product.id} data={product} />;
                                  })
                            : dataSearch
                                  ?.concat()
                                  .reverse()
                                  .map((product) => {
                                      return <ProductCart key={product.id} data={product} />;
                                  })}
                    </div>

                    {page < pageNumber ? (
                        <div className="flex justify-center items-center m-[36px]">
                            <span
                                className="text-lg font-medium hover:font-bold cursor-pointer px-2 py-3"
                                onClick={handlePagination}
                            >
                                Load more...
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default SearchPage;
