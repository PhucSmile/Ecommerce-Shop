import Link from 'next/link';
import React, { useState } from 'react';
import { BsDot } from 'react-icons/bs';

export default function SubMenu({ item }) {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => {
        setSubnav(!subnav);
    };

    //   console.log(item);
    return (
        <>
            <div
                className="menu-link flex items-center justify-between pb-[10px] border-b-[1px] border-solid border-[#E6E9EE] cursor-pointer "
                onClick={item.subNav && showSubnav}
            >
                <div className="flex justify-center items-center gap-[10px] text-base text-[#434A54] font-normal">
                    <img src={item?.icon} alt="" />
                    <p>{item?.title}</p>
                </div>
                <div>{item.subNav && subnav ? item.iconOpen : item.subNav ? item.iconClose : null}</div>
            </div>

            {subnav &&
                item.subNav?.map((subItem, index) => {
                    return (
                        <div
                            key={index}
                            className="pb-[10px] pl-[20px] border-b-[1px] border-solid border-[#E6E9EE] flex items-center gap-2 cursor-pointer hover:font-medium"
                        >
                            <BsDot />
                            <a>
                                <Link href={`${subItem?.path}`}>{subItem.title}</Link>
                            </a>
                        </div>
                    );
                })}
        </>
    );
}
