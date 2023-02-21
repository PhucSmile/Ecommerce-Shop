import React from 'react';
import { Container } from '../common';
import Slider from 'react-slick';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { useProductLimitApi } from '@/hook/useProductApi';

import ProductCart from '../product/ProductCart';
import Title from '../common/Title';
import Loading from '../common/Loading';
function SampleNextArrow({ onClick }) {
    return (
        <div className="arrow arrow-right" onClick={onClick}>
            <BiChevronRight />
        </div>
    );
}

function SamplePrevArrow({ onClick }) {
    return (
        <div className="arrow arrow-left" onClick={onClick}>
            <BiChevronLeft />
        </div>
    );
}
const FeatureProduct = () => {
    const { data, isLoading } = useProductLimitApi(16);
    if (isLoading) {
        return <Loading />;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        rows: 2,
        slidesPerRow: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Container>
            <div className="most__product relative mt-7 lg:mt-0">
                <Title title="Featured products" setRight />
                <Slider {...settings}>
                    {data?.data && data?.data?.products.map((item) => <ProductCart data={item} key={item.id} />)}
                </Slider>
            </div>
        </Container>
    );
};

export default FeatureProduct;
