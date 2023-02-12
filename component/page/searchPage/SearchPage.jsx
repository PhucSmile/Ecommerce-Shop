import React, { useEffect, useState } from 'react';
import { Container } from '@/component/common';
import Loading from '@/component/common/Loading';

import { useAllCategoriesApi, useFilterCategoryApi } from '@/hook/useCategoryApi';
import { useSearchApi } from '@/hook/useProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import ProductCart from '@/component/product/ProductCart';
import NavSearchMobile from '@/component/navSearchMobile/NavSearchMobile';
import Image from 'next/image';
import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';

const path = {
    pathOne: 'home',
    pathTwo: 'search',
};

const listSortPrice = ['Sort', 'Reverse'];
const SearchPage = () => {
    const [dataSearch, setDataSearch] = useState();
    const [stickyScroll, setStickyScroll] = useState(false);
    const [loadingQuitSearch, setLoadingQuitSearch] = useState(false);

    // paginate
    const [page, setPage] = useState(12);
    const [pageNumber, setPageNumber] = useState(0);
    const [isCheckedPagination, setIsCheckedPagination] = useState(false);
    const [loadingPagination, setLoadingPagination] = useState(false);

    // select
    const [selectedCategories, setSelectedCategories] = useState('Filter by category');
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

    // search keywords
    useEffect(() => {
        (async () => {
            try {
                setLoadingQuitSearch(true);
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
                        setLoadingQuitSearch(false);
                    },
                    onError: (err) => {
                        console.log('error', err);
                    },
                });
            } catch (error) {}
        })();
    }, [resultSearch]);

    // search category
    useEffect(() => {
        if (params.category) {
            setLoadingQuitSearch(true);
            const paramSearchCategories = {
                category: params.category,
            };
            useSearchCategoriesMutate.mutate(paramSearchCategories, {
                onSuccess: (res) => {
                    queryClient.refetchQueries();
                    setDataSearch(res?.data.products);
                    setIsCheckedPagination(true);
                    setPage(12);
                    setPageNumber(res?.data.total);
                    setLoadingQuitSearch(false);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }
    }, [params.category]);

    const handleReset = () => {
        setSelectedCategories('Filter by category');
        setSelectedPrice('Sort');
    };
    const handleStopFilter = async () => {
        setLoadingQuitSearch(true);
        router.push('/search');
        setTimeout(() => {
            setLoadingQuitSearch(false);
        }, 1000);
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
    const handleFilterSearch = () => {
        if (selectedCategories !== 'Select category') {
            router.replace(
                {
                    pathname: '/search',
                    query: {
                        category: selectedCategories,
                    },
                },
                undefined,
                { shallow: true },
            );
        }
    };
    const handlePagination = async () => {
        let params = {};
        setPage((prev) => prev + 12);
        setStickyScroll(true);
        setLoadingPagination(true);
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
                        setLoadingPagination(false);
                    },
                    onError: (err) => {},
                });
            } else {
                await useSearchCategoriesMutate.mutate(params, {
                    onSuccess: (res) => {
                        setDataSearch(res?.data.products);
                        setPageNumber(res?.data.total);
                        setLoadingPagination(false);

                        // setPageNumber(res?.data.total)
                    },
                    onError: (err) => {},
                });
            }
        } catch (error) {}
    };

    if (loadingQuitSearch) {
        return <Loading />;
    }

    return (
        <Container>
            <Breadcrumb path={path} />
            {/* nav search Mobile */}
            <NavSearchMobile
                dataCategories={dataCategories?.data}
                dataListSortPrice={listSortPrice}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                handleFilterSearch={handleFilterSearch}
                handleReset={handleReset}
                handleStopFilter={handleStopFilter}
                isMobile
            />

            <div className="grid grid-cols-3 gap-[122px] ">
                {/* left */}
                <div className="hidden lg:block"></div>

                {/* right */}
                <div className="col-span-3 lg:col-span-2  w-full my-[28px]">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xl font-medium">Search results for “{params.q || params.category}”</h4>
                        <span className="text-xs font-normal"> {dataSearch?.total} Result </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-[122px] w-full ">
                {/* left */}
                <NavSearchMobile
                    stickyScroll={stickyScroll}
                    dataCategories={dataCategories?.data}
                    dataListSortPrice={listSortPrice}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    handleFilterSearch={handleFilterSearch}
                    handleReset={handleReset}
                    handleStopFilter={handleStopFilter}
                />

                {/* right */}
                <div className="col-span-3 lg:col-span-2  w-full ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
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
                            <button
                                className="text-lg font-medium hover:font-bold cursor-pointer px-2 py-3"
                                onClick={handlePagination}
                                enable={loadingPagination}
                            >
                                {loadingPagination && (
                                    <div className="loader w-[100px] h-[100px] animate-[spin_2s_linear_infinite]">
                                        <div className="relative aspect-[100/100]">
                                            <Image
                                                src="/images/loadingPagination.svg"
                                                alt="loading"
                                                layout="fill"
                                                sizes="(max-width: 768px) 100vw,
                                            (max-width: 1200px) 50vw,
                                            33vw"
                                            />
                                        </div>
                                    </div>
                                )}{' '}
                                Load more...
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </Container>
    );
};

export default SearchPage;
