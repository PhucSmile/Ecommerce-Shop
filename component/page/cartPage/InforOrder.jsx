import { formatPrice } from '@/component/utils/helpers';
import React from 'react';

const InforOrder = ({ totalQuantityCart, totalAmountCart, handleCheckout = () => {} }) => {
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

                <img src="images/svg/icon-arrow-right.svg" className="cursor-pointer" />
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
                <div className="flex justify-between items-center mb-5">
                    <span className="text-[14px]">Total (4)</span>
                    <span className="text-xl font-bold">{formatPrice(totalAmountCart)}</span>
                </div>
                <button className="btn-primary w-full" onClick={handleCheckout}>
                    Buy ({totalQuantityCart})
                </button>
            </div>
        </div>
    );
};

export default InforOrder;
