import React from 'react';
import Image from 'next/image';
import { Container } from '../common';

import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroProduct = ({ data }) => {
    return (
        <Container>
            <section>
                <div className="grid grid-cols-1 space-y-4 md:grid-cols-2">
                    <div className="m-auto">
                        <h3 className="font-medium">Trending product in 2023</h3>
                        <Link href={`/product-detail/${data.id}`}>
                            <h2 className=" text-[25px] lg:text-[40px] font-semibold my-5">{data?.title}</h2>
                        </Link>
                        <p className="text-[12px] lg:text-[16px]">{data?.description}</p>
                        <Link href={`/product-detail/${data.id}`}>
                            <motion.button whileHover={{ scale: 1.2 }} className="btn-primary mt-10">
                                Info
                            </motion.button>
                        </Link>
                    </div>
                    <div className="px-3">
                        <div className="relative  h-[280px] w-full lg:h-[480px] cursor-pointer">
                            <Image
                                src={data?.images[0]}
                                layout="fill"
                                objectFit="contain"
                                alt={data?.title}
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default HeroProduct;
