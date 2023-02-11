import { IconDelete, IconMinus, IconPlus } from '@/assets/svg';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/helpers';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { useEditCartApi } from '@/hook/useCartApi';
import { useDispatch } from 'react-redux';
import { addToCart, deleteCart, removeCart } from '@/store/slice/useCart';

const Table = ({ data, userId }) => {
    console.log('dataCart', data);
    const dispatch = useDispatch();
    const useUpdateCartMutate = useEditCartApi(userId);
    const queryClient = useQueryClient();

    const handleAddItem = async (item) => {
        console.log('id cart', item);
        await dispatch(
            addToCart({
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
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
        <table class="table ">
            <thead>
                <tr>
                    <th className="border">Image</th>
                    <th className="border">Title</th>
                    <th className="border">Unit Price</th>
                    <th className="border">Quantity</th>
                    <th className="border">Total Price</th>
                    <th className="border">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length ? (
                    data?.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-100">
                            <td className="border w-full">
                                <div className="relative h-[80px] w-full ">
                                    <Image
                                        src={item?.image}
                                        layout="fill"
                                        objectFit="contain"
                                        alt="Logo"
                                        sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                                        className="rounded py-1"
                                    />
                                </div>
                            </td>
                            <td className="border p-2 text-left hover:font-semibold">
                                <Link href={`/product-detail/${item.id}`}>{item?.title}</Link>
                            </td>
                            <td className="border p-2">{formatPrice(item?.price)}</td>
                            <td className="border p-2">
                                <div className="flex items-center justify-center gap-4 ">
                                    <motion.span whileTap={{ scale: 1.4 }} onClick={() => handleRemove(item?.id)}>
                                        <IconMinus />
                                    </motion.span>
                                    <span className="rounded-[1px] border border-solid border-slate-400 p-2">
                                        {item?.quantity}
                                    </span>
                                    <motion.span whileTap={{ scale: 1.4 }} onClick={() => handleAddItem(item)}>
                                        <IconPlus />
                                    </motion.span>
                                </div>
                            </td>
                            <td className="border p-2">{formatPrice(item?.totalPrice)}</td>
                            <td className="border p-2 ">
                                <motion.span
                                    whileHover={{ scale: 1.2 }}
                                    className="block cursor-pointer"
                                    onClick={() => handleDelete(item?.id)}
                                >
                                    <IconDelete />
                                </motion.span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className="text-center border text-xl font-medium">No item</tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
