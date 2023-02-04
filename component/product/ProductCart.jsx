import Image from 'next/image';
import React, { useCallback } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconAdd } from '@/assets/svg';
import { toast } from 'react-toastify';

const ProductCart = ({ data }) => {
    const handleAddCart = useCallback(async () => {
        console.log('addCart', data?.id);
        toast.success('Product added to successfully');
    }, [data?.id]);

    return (
        <div className="shadow">
            <Link href={`/product-detail/${data?.id}`}>
                <motion.div whileHover={{ scale: 0.9 }} className="relative w-full h-[300px] md:h-[220px] ">
                    <Image
                        src={data?.images[0]}
                        layout="fill"
                        objectFit="contain"
                        alt="image-product"
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    />
                </motion.div>
            </Link>
            <div className="p-2">
                <Link href={`/product-detail/${data?.id}`}>
                    <h3 className="text-lg lg:text-xl font-semibold mt-[15px] ">{data?.title}</h3>
                </Link>
                <span className="text-sm">{data?.category}</span>
                <div className="flex justify-between items-center">
                    <span className="text-base lg:text-xl font-semibold">{data?.price}$</span>
                    <motion.span
                        whileTap={{ scale: 1.2 }}
                        className="w-[30px] h-[30px] cursor-pointer"
                        onClick={handleAddCart}
                    >
                        <IconAdd />
                    </motion.span>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
