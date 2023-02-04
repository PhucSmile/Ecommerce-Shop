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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                        <div className="">
                            <h4 className="font-medium mb-2">Limited Offers</h4>
                            <h3 className="text-xl font-semibold mb-4">Quantity Limited</h3>
                            <Clock />
                            <Link href={`/product-detail/${data?.data.id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="btn-outline mt-10 hover:bg-[#202020]"
                                >
                                    Visit Store
                                </motion.button>
                            </Link>
                        </div>
                        <div className="mx-auto lg:ml-auto">
                            <Link href={`/product-detail/${data?.data.id}`}>
                                <div className="relative  h-[245px] w-[445px] cursor-pointer">
                                    <Image
                                        src={data?.data.thumbnail}
                                        layout="fill"
                                        objectFit="contain"
                                        alt={data?.data?.title}
                                        sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                    />
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
