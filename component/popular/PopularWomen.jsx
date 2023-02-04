import { useCategoryApi } from '@/hook/useCategoryApi';
import React from 'react';
import Title from '../common/Title';
import ProductList from '../product/ProductList';
import { Container } from '../common';

const PopularWomen = () => {
    const argument = {
        params: {
            category: 'womens-watches',
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
                <Title title="Womens Watches" />
                <ProductList data={data?.data?.products} />
            </section>
        </Container>
    );
};

export default PopularWomen;
