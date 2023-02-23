import { IconCheck } from 'assets/svg';
import Image from 'next/legacy/image';
import React from 'react';

const BankCart = ({ data, defaultBtn, onDelete = () => {}, onDefaul = () => {} }) => {
    return (
        <div className="flex justify-between items-center rounded-3xl shadow ">
            <div className="flex items-center">
                <div className="relative  h-[40px] md:h-[50px] w-[50px] md:w-[67px] m-[18px] sm:m-[23px]">
                    <Image src="/images/payment/ACB.png" layout="fill" objectFit="cover" priority alt="image-bank" />
                </div>
                <div className="hidden sm:block border-l-[1px] border-solid border-[#DBDCDC pl-[10px]">
                    <h4 className="text-xl font-bold">Bank {data?.cardType} </h4>
                    <span className="text-xs font-semibold">{data?.iban}</span>
                    <h4 className="uppercase font-bold">{data?.currency} </h4>
                </div>
            </div>
            <div className="py-[18px]">
                <div className="flex flex-col gap-[5px] px-3 md:px-[18px] sm:px-[34px] border-l-[1px] border-solid border-[#DBDCDC]">
                    {defaultBtn ? (
                        <button
                            className="btn flex  md:min-w-[173px] justify-center text-Orange font-semibold text-xs md:text-sm"
                            onClick={onDefaul}
                        >
                            Default
                            <IconCheck />
                        </button>
                    ) : (
                        <button className="btn-outline md:min-w-[173px] text-xs md:text-sm " onClick={onDefaul}>
                            Default setting
                        </button>
                    )}
                    <button
                        className="text-orange font-semibold text-center text-xs md:text-sm mt-2"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankCart;
