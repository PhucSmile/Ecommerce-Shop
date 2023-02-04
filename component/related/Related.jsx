import { useCategoryApi } from '@/hook/useCategoryApi';
import React from 'react';
import ProductList from '../product/ProductList';

const Related = ({ category }) => {
    const argument = {
        params: {
            category: category,
            limit: 20,
        },
        options: {
            keepPreviousData: true,
        },
    };
    const { data } = useCategoryApi(argument);
    return (
        <div>
            <h3 className="font-semibold text-xl ">Related Categories</h3>
            <div className="my-10">
                <ProductList data={data?.data?.products} />
            </div>
        </div>
    );
};

export default Related;
