import { IconArrowRight, IconPlus } from '@/assets/svg';
import { formatPrice } from '@/component/utils/helpers';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const InforOrder = ({ totalQuantityCart, totalAmountCart, discountedTotal, handleCheckout = () => {} }) => {
    return (
        <div className=" shadow-cartItem rounded-lg p-6">
            <div className="flex justify-between items-center mb-[18px]">
                <h6 className="text-xl font-semibold ">Admin contact information</h6>
                <span className="font-semibold text-orange cursor-pointer">Edit</span>
            </div>

            <div className="flex justify-between  items-center  border-b-[1px] border-solid border-text">
                <div className="pb-2">
                    <div className="font-medium mb-1">
                        <span className="relative pr-2  after:absolute after:content-[''] after:right-0 after:top-[3px] after:bottom-[3px] after:w-[1px] after:bg-text">
                            Admin
                        </span>
                        <span className="pl-2">070 123 456</span>
                    </div>
                    <span className="text-[14px]  text-text ">Ecommerce@gmail.com</span>
                </div>

                <span>
                    <IconArrowRight />
                </span>
            </div>

            <div className="mx-[7px]">
                <h5 className="text-xl font-semibold my-6">Information order</h5>
                <div className="flex justify-between items-center mb-5">
                    <span className="text-[14px]">Total Quantity</span>
                    <span className="text-xl font-medium">{totalQuantityCart}</span>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <span className="text-[14px]">Provisional</span>
                    <span className="text-xl font-medium">{formatPrice(totalAmountCart)}</span>
                </div>
                {!discountedTotal ? (
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-[14px]">Total (4)</span>
                        <span className="text-xl font-bold">{formatPrice(totalAmountCart)}</span>
                    </div>
                ) : (
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-[14px]">Discounted Total </span>
                        <span className="text-xl font-bold">{formatPrice(discountedTotal)}</span>
                    </div>
                )}
                {!discountedTotal ? (
                    <div className="flex justify-center">
                        <button className="btn-primary  w-[60%] lg:w-full" onClick={handleCheckout}>
                            Checkout ({totalQuantityCart})
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <button type="submit" className="btn-primary w-[60%] lg:w-full">
                                Buy
                            </button>
                            <Link href={'#'} className="flex items-center justify-center space-x-2 mt-4 ">
                                <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    className="block  h-4 w-4 lg:h6 lg:w-6 mb-[5px] "
                                    onClick={() => handleAddItem(data)}
                                >
                                    <IconPlus />
                                </motion.span>
                                Add a payment account
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InforOrder;
