import { IconDelete, IconMinus, IconPlus } from '@/assets/svg';
import Image from 'next/image';
import React from 'react';
import { formatPrice } from '../utils/helpers';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart, deleteCart, removeCart } from '@/store/slice/useCart';
import Link from 'next/link';
const TableItem = ({ data }) => {
    console.log('data', data);
    const dispatch = useDispatch();

    const handleAddItem = async (data) => {
        console.log('id cart', data);
        await dispatch(
            addToCart({
                id: data.id,
                title: data.title,
                image: data.image,
                price: data.price,
            }),
        );
    };

    const handleRemove = async (id) => {
        try {
            await dispatch(removeCart({ id }));
        } catch (error) {}
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteCart({ id }));
        } catch (error) {}
    };
    return (
        <div className="p-4 border-b-[1px] border-solid border-text w-full">
            <div className="flex items-center justify-between space-x-[6px] ">
                <div className=" flex justify-between w-full shadow-checkbox ">
                    <div className="flex justify-between items-center space-x-[10px]">
                        <Link href={`/product-detail/${data?.id}`}>
                            <div className="relative h-[80px] w-[80px]  md:h-[100px] md:w-[100px] hover:opacity-75">
                                <Image
                                    src={data?.image}
                                    layout="fill"
                                    objectFit="contain"
                                    alt="Logo"
                                    sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                                />
                            </div>
                        </Link>

                        <div className="flex flex-col justify-center item-center  ">
                            <Link href={`/product-detail/${data?.id}`}>
                                {' '}
                                <h5 className="font-bold cursor-pointer hover:opacity-75">{data?.title}</h5>
                            </Link>
                            <span className="font-bold">Quantity: {data?.quantity}</span>
                            <div className="flex items-center justify-between lg:w-[300px]  flex-wrap">
                                <span className="font-bold">Price: {formatPrice(data?.price)}</span>
                                <span className="font-bold">Total Price: {formatPrice(data?.totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-center items-center pl-3 lg:pl-5 border-l-[1px] border-solid border-[#ccc]">
                        <div className="flex items-center justify-center gap-2 lg:gap-4 ">
                            <motion.span
                                whileTap={{ scale: 1.4 }}
                                className="h-4 w-4 lg:h6 lg:w-6 cursor-pointer"
                                onClick={() => handleRemove(data?.id)}
                            >
                                <IconMinus />
                            </motion.span>
                            <span className="rounded-[1px] border border-solid border-slate-400 p-1 lg:p-2 text-sm lg:text-base">
                                {data?.quantity}
                            </span>
                            <motion.span
                                whileTap={{ scale: 1.4 }}
                                className="h-4 w-4 lg:h6 lg:w-6 cursor-pointer"
                                onClick={() => handleAddItem(data)}
                            >
                                <IconPlus />
                            </motion.span>
                        </div>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            className="block cursor-pointer h-5 w-5 lg:h6 lg:w-6"
                            onClick={() => handleDelete(data?.id)}
                        >
                            <IconDelete />
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableItem;
