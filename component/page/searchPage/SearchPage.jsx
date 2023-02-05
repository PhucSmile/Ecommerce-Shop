import React, { useEffect, useState } from 'react';
import { Container } from '@/component/common';
import Loading from '@/component/common/Loading';
import Select from '@/component/select/Select';
import { useAllCategoriesApi } from '@/hook/useCategoryApi';
import { useSearchApi } from '@/hook/useProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import ProductCart from '@/component/product/ProductCart';

const listSortPrice = ['Low Price', 'Hight Price'];
const SearchPage = () => {
    const [dataSearch, setDataSearrch] = useState();
    const router = useRouter();
    const params = {
        ...router.query,
    };
    const resultSearch = useSelector((state) => state.search.search);
    // fetch data query
    const { data: dataCategories } = useAllCategoriesApi();
    const useSearchMutate = useSearchApi();
    const queryClient = useQueryClient();

    useEffect(() => {
        (async () => {
            try {
                await useSearchMutate.mutate(resultSearch.q, {
                    onSuccess: (res) => {
                        queryClient.refetchQueries();
                        setDataSearrch(res?.data);
                    },
                    onError: (err) => {
                        console.log('error', err);
                    },
                });
            } catch (error) {}
        })();
    }, [resultSearch]);
    // console.log('dataSearch', dataSearch);

    const handleReset = () => {};
    const handleStopFilter = () => {};
    const handleFilterSearch = () => {};
    if (useSearchMutate.isLoading) {
        return <Loading />;
    }
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
                        <div className="flex flex-col mb-4">
                            <label htmlFor="search" className="text-sm font-semibold mb-2">
                                Search
                            </label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Search...."
                                className="block shadow-md w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none  sm:text-sm"
                            />
                        </div>
                        {/*search categories */}
                        <Select data={dataCategories?.data} title="Categories" defaultPlaceholder="Select category" />

                        {/* sort price */}
                        <Select data={listSortPrice} title="Sort price" defaultPlaceholder="Select price" />

                        <div className="flex justify-end items-center gap-[16px] mt-5 mb-[303px]">
                            <span className=" cursor-pointer px-1 py-1" onClick={handleReset}>
                                Đặt lại
                            </span>
                            <span
                                className="font-bold text-[#FF6C00] cursor-pointer px-1 py-1"
                                onClick={handleFilterSearch}
                            >
                                Xong
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] py-6 gap-2">
                        <button className="btn-outline px-[40px]" onClick={handleStopFilter}>
                            Bỏ lọc
                        </button>
                        <button className="btn px-[40px]" onClick={handleFilterSearch}>
                            Lọc
                        </button>
                    </div>
                </div>

                {/* right */}
                <div className="col-span-2  w-full ">
                    <div className="grid grid-cols-3 gap-[25px]">
                        {dataSearch &&
                            dataSearch?.products?.map((product) => {
                                return <ProductCart key={product.id} data={product} />;
                            })}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchPage;
