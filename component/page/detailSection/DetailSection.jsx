import React from 'react';
import Slider from 'react-slick';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import Image from 'next/image';
import { Container } from '@/component/common';

import { motion } from 'framer-motion';
import ReactStars from 'react-rating-stars-component';
import TabDetail from '@/component/tab/TabDetail';
import Related from '@/component/related/Related';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slice/useCart';
import { toast } from 'react-toastify';
import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';

const path = {
    pathOne: 'home',
    pathTwo: 'product detail',
};

const DetailSection = ({ data }) => {
    const dispatch = useDispatch();
    const handleAddCart = async () => {
        try {
            await dispatch(
                addToCart({
                    id: data.id,
                    title: data.title,
                    image: data.images[0],
                    price: data.price,
                }),
            );
            toast.success('Product added to successfully');
        } catch (error) {}
    };

    const setting = {
        size: 30,
        value: data?.rating,
        edit: false,
    };

    const settings = {
        customPaging: function (i) {
            return (
                // <div>
                //     {/* <img src={`${baseUrl}/abstract0${i + 1}.jpg`} /> */}
                //     <div className="relative w-full h-[100px]">
                //         <Image src={data?.images[i]} layout="fill" objectFit="contain" alt="" />
                //     </div>
                // </div>
                <a>
                    <img src={data?.images[i]} alt="image-product" />
                </a>
            );
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Helmet title="Detail">
            <Container>
                <Breadcrumb path={path} />
            </Container>
            <CommonSection
                title={data?.category ? data?.category.replace('-', ' ') : ''}
                image={'/images/common/common.png'}
            />
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 lg:my-[60px]">
                    <div>
                        {/* <div className="relative h-[355px] sm:h-[400px] md:h-[516px] lg:h-[636px] w-full ">
                            <Image src={data?.images[0]} layout="fill" objectFit="contain" alt={data?.title} />
                        </div> */}

                        <Slider {...settings}>
                            {data?.images.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative h-[355px] sm:h-[400px] md:h-[500px]  w-[98%] rounded-md "
                                >
                                    <Image
                                        src={item}
                                        layout="fill"
                                        objectFit="contain"
                                        alt="image-detail"
                                        sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="mt-[120px] sm:mt-[150px] md:mt-[160px] lg:my-auto">
                        <h3 className="text-2xl font-semibold mb-[5px]">{data?.title}</h3>
                        <div className="flex items-center gap-5">
                            <ReactStars {...setting} />
                            <div className="text-[#ffd700]">
                                ({data?.rating?.rate} <span className="text-primary">Ratings</span>)
                            </div>
                        </div>
                        <div className="flex  items-center gap-10 my-4">
                            <span className="text-xl font-semibold">{data?.price}$</span>
                            <div className="flex flex-col  gap-1">
                                <span className="font-normal">
                                    Brand: <span className="uppercase">{data?.brand}</span>
                                </span>
                                <span className="font-normal">
                                    Category:{' '}
                                    <span className="uppercase">
                                        {data?.category ? data?.category.replace('-', ' ') : ''}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <p className="text-text mb-8 lg:mb-10">{data?.description}</p>
                        <motion.button whileTap={{ scale: 1.5 }} className="btn-primary" onClick={handleAddCart}>
                            Add To Cart
                        </motion.button>
                    </div>
                </div>
                <TabDetail desc={data?.description} />
                <Related category={data?.category} />
            </Container>
        </Helmet>
    );
};

export default DetailSection;
