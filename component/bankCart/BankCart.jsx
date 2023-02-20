import { IconCheck } from 'assets/svg';
import Image from 'next/image';
import React from 'react';

const BankCart = ({ data, defaultBtn, onDelete = () => {}, onDefaul = () => {} }) => {
    return (
        <div className="flex justify-between items-center rounded-3xl shadow ">
            <div className="flex items-center">
                <div className="relative h-[52px] w-[67px] m-[23px]">
                    <Image src="/images/payment/ACB.png" priority layout="fill" objectFit="cover" alt="" />
                </div>
                <div className="border-l-[1px] border-solid border-[#DBDCDC pl-[10px]">
                    <h4 className="text-xl font-bold">Bank {data?.cardType} </h4>
                    <span className="text-xs font-semibold">{data?.iban}</span>
                    <h4 className="uppercase font-bold">{data?.currency} </h4>
                </div>
            </div>
            <div className="py-[18px]">
                <div className="flex flex-col gap-[5px] px-[34px] border-l-[1px] border-solid border-[#DBDCDC]">
                    {defaultBtn ? (
                        <button
                            className="btn flex gap-2 w-[173px] justify-center text-Orange font-semibold"
                            onClick={onDefaul}
                        >
                            Default
                            <span>
                                <IconCheck />
                            </span>
                        </button>
                    ) : (
                        <button className="btn-outline w-[173px] " onClick={onDefaul}>
                            Default setting
                        </button>
                    )}
                    <button className="text-orange font-semibold text-center" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankCart;
