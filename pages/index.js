import BestSales from '@/component/bestSales/BestSales';
import HeroSection from '@/component/heroSection/HeroSection';
import Jewellery from '@/component/popular/Jewellery';
import PopularMen from '@/component/popular/PopularMen';
import PopularWomen from '@/component/popular/PopularWomen';
import Services from '@/component/services/Services';
import TimeCount from '@/component/timeCount/TimeCount';
import Trending from '@/component/trending/Treding';
import React from 'react';

export default function Homepage() {
    return (
        <>
            <HeroSection />
            <Services />
            <Trending />
            <BestSales />
            <TimeCount />
            <PopularWomen />
            <PopularMen />
            <Jewellery />
        </>
    );
}
