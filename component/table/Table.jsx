import { IconDelete, IconMinus, IconPlus } from '@/assets/svg';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/helpers';
import Link from 'next/link';

const Table = ({ data, userId }) => {
    return (
        <table class="table ">
            <thead>
                <tr>
                    <th className="border">Title</th>
                    <th className="border">Unit Price</th>
                    <th className="border">Quantity</th>
                    <th className="border">Total Price</th>
                    <th className="border">Action</th>
                </tr>
            </thead>
            <tbody>
                {data ? (
                    data?.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-100">
                            <td className="border p-2 text-left hover:font-semibold">
                                <Link href={`/product-detail/${item.id}`}>{item?.title}</Link>
                            </td>
                            <td className="border p-2">{formatPrice(item?.price)}</td>
                            <td className="border p-2">
                                <div className="flex items-center justify-center gap-4 ">
                                    <motion.span whileTap={{ scale: 1.4 }}>
                                        <IconMinus />
                                    </motion.span>
                                    <span className="rounded-[1px] border border-solid border-slate-400 p-2">
                                        {item?.quantity}
                                    </span>
                                    <motion.span whileTap={{ scale: 1.4 }}>
                                        <IconPlus />
                                    </motion.span>
                                </div>
                            </td>
                            <td className="border p-2">{formatPrice(item?.total)}</td>
                            <td className="border p-2 ">
                                <motion.span whileHover={{ scale: 1.2 }} className="block cursor-pointer">
                                    <IconDelete />
                                </motion.span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>No item</tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
