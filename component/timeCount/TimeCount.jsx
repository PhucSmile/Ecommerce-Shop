import React from 'react';
import { Container } from '../common';

import { motion } from 'framer-motion';
import Clock from '../clock/Clock';
import Image from 'next/image';
import { useDetailProductApi } from '@/hook/useProductApi';
import Link from 'next/link';

const TimeCount = () => {
    const { data } = useDetailProductApi(1);

    return (
        <div className="bg-[#202020] text-[#FDFDFD] drop-shadow-2xl">
            <Container>
                <section>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="">
                            <h4 className="text-sm lg:text-base font-medium mb-2">Limited Offers</h4>
                            <h3 className="text-lg lg:text-xl font-semibold mb-4">Quantity Limited</h3>
                            <Clock />
                            <Link href={`/product-detail/${data?.data.id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="btn-outline text-white bg-[#202020] border-white mt-6 lg:mt-10 hover:bg-white hover:text-[#202020] hover:border-[#202020]"
                                >
                                    Visit Store
                                </motion.button>
                            </Link>
                        </div>
                        <div className="mx-auto lg:ml-auto">
                            <Link href={`/product-detail/${data?.data.id}`}>
                                <div className="relative h-[245px] w-[300px] lg:h-[245px] lg:w-[445px] cursor-pointer">
                                    <Image src={data?.data.thumbnail} fill contain alt={data?.data?.title} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default TimeCount;
