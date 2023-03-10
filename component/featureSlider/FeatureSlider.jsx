import React from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
import ProductCart from '../product/ProductCart';

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
const FeatureSlider = ({ data }) => {
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
        <Slider {...settings}>
            {data?.data?.products.map((item) => (
                <ProductCart data={item} key={item.id} />
            ))}
        </Slider>
    );
};

export default FeatureSlider;
