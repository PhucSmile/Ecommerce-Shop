import React from 'react';
import { Container } from '../common';
import Title from '../common/Title';
import ProductList from '../product/ProductList';
import { useCategoryApi } from '@/hook/useCategoryApi';

const BestSales = () => {
    const argument = {
        params: {
            category: 'laptops',
            limit: 4,
        },
        options: {
            keepPreviousData: true,
        },
    };

    const { data } = useCategoryApi(argument);

    return (
        <Container>
            <section>
                <Title title="Best Sales" />
                <ProductList data={data?.data?.products} />
            </section>
        </Container>
    );
};

export default BestSales;
