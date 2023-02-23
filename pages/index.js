import React from 'react';
import BestSales from '@/component/bestSales/BestSales';
import HeroSection from '@/component/heroSection/HeroSection';
import PopularMen from '@/component/popular/PopularMen';
import PopularWomen from '@/component/popular/PopularWomen';
import Services from '@/component/services/Services';
import TimeCount from '@/component/timeCount/TimeCount';
import Trending from '@/component/trending/Treding';
import Feature from '@/component/feature/Feature';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { productApi } from '@/apiClient/productApi';
import { categoryApi } from '@/apiClient/categoryApi';

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(['get-all-products'], async () => {
            const res = await productApi.getAll();
            return res.data.data;
        }),

        queryClient.prefetchQuery(['get-all-categories'], async () => {
            const res = await categoryApi.getAllCategories();
            return res.data.data;
        }),

        queryClient.prefetchQuery([`get-detail-product`, 1], async () => {
            const res = await productApi.getDetail(1);
            return res.data.data;
        }),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        // revalidate: 60,
    };
}

export default function Homepage() {
    return (
        <>
            <HeroSection />
            <Services />
            <Feature />
            <Trending />
            <BestSales />
            <TimeCount />
            <PopularWomen />
            <PopularMen />
        </>
    );
}
