import React, { useEffect, useState } from 'react';
import { Container } from '../common';
import Title from '../common/Title';

import { useCategoryApi } from '@/hook/useCategoryApi';
import Loading from '../common/Loading';
import ProductList from '../product/ProductList';

const Trending = () => {
    const argument = {
        params: {
            category: 'smartphones',
            limit: 4,
        },
        options: {
            keepPreviousData: true,
        },
    };

    const { data: dataCategory } = useCategoryApi(argument);
    return (
        <Container>
            <section>
                <Title title="Trending Products" />
                <ProductList data={dataCategory?.data?.products} />
            </section>
        </Container>
    );
};

export default Trending;
