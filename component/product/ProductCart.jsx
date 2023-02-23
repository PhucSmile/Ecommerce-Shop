import Image from 'next/image';
import React, { useCallback } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconAdd } from '@/assets/svg';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slice/useCart';
import { formatPrice } from '../utils/helpers';

const ProductCart = ({ data }) => {
    const dispatch = useDispatch();
    const handleAddCart = useCallback(async () => {
        console.log('id cart', data);
        await dispatch(
            addToCart({
                id: data.id,
                title: data.title,
                image: data.images[0],
                price: data.price,
            }),
        );
        toast.success('Product added to successfully');
    }, [data?.id]);

    return (
        <div className="shadow flex flex-col ">
            <Link href={`/products/${data?.id}`} className="shrink-0">
                <motion.div whileHover={{ scale: 0.9 }} className="relative w-full h-[150px] md:h-[220px] ">
                    <Image src={data?.images[0]} layout="fill" objectFit="contain" alt="image-product" priority />
                </motion.div>
            </Link>
            <div className="p-2 flex flex-col flex-1">
                <div>
                    <Link href={`/products/${data?.id}`}>
                        <h3 className="product__cart-title  text-base lg:text-xl font-semibold mt-[15px] h-[48px] lg:h-[56px] ">
                            {data?.title}
                        </h3>
                    </Link>
                    <span className="text-sm"> {data?.category ? data?.category.replace('-', ' ') : ''}</span>
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-base lg:text-xl font-semibold">{formatPrice(data?.price)}</span>
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
