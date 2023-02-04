import React from 'react';
import ProductCart from './ProductCart';

const ProductList = ({ data }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.map((item) => (
                    <ProductCart data={item} key={item.id} />
                ))}
            </div>
        </>
    );
};

export default ProductList;
