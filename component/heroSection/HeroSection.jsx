import { useProductLimitApi } from '@/hook/useProductApi';
import React from 'react';
import Slider from 'react-slick';
import HeroProduct from '../heroProduct/HeroProduct';
import Loading from '../common/Loading';

const HeroSection = () => {
    const { data, isLoading } = useProductLimitApi(5);
    if (isLoading) {
        return <Loading />;
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return (
        <div>
            {data?.data && (
                <Slider {...settings}>
                    {data?.data?.products?.map((item) => (
                        <HeroProduct key={item.id} data={item} />
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default HeroSection;
