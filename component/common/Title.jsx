import Link from 'next/link';
import React from 'react';

export default function Title({ title, setRight, nonePadding }) {
    return (
        <div
            className={`relative flex justify-between items-center mb-[6px] lg:mb-8 ${
                nonePadding ? '' : 'px-[15px] lg:px-0'
            }`}
        >
            <h2 className="text-[#333333] font-bold text-xl lg:text-2xl">{title}</h2>
            <Link
                href={'/products/search'}
                className={` absolute ${
                    setRight ? 'right-0 sm:right-28' : 'right-0'
                } text-[13px] lg:text-base text-[#959595] font-normal hover:text-[#FF6C00] hover:font-semibold hover:cursor-pointer`}
            >
                See more
            </Link>
        </div>
    );
}
