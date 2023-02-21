import React, { useState } from 'react';
import { Container } from '../common';
import { IconCart, IconHome, IconSearch, IconUser, IconUserNav } from '@/assets/svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const listTabs = [
    {
        title: 'Home',
        href: '/',
        icon: <IconHome className="w-6 h-6 " />,
    },
    {
        title: 'Search',
        href: '/search',
        icon: <IconSearch className="w-6 h-6 " />,
    },
    {
        title: 'Cart',
        href: '/cart',
        icon: <IconCart className="w-6 h-6 " />,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: <IconUserNav className="w-6 h-6 " />,
    },
];

export default function TabsBottom() {
    const router = useRouter();
    console.log('router', router.pathname);
    return (
        <div className=" bg-white shadow-paymentSetting  pb-0 sm:pb-[10px] w-full  sm:static   md:px-[15px] sm:px-0 z-50">
            <Container>
                <div className="list-bottom flex justify-between  md:px-5">
                    {listTabs.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <div
                                className={classNames(
                                    `border-transparent  hover:text-Orange hover:border-Orange ${
                                        router.pathname === item.href && 'border-Orange text-Orange '
                                    } `,
                                    `item-bottom w-[76px] flex flex-col items-center justify-center whitespace-nowrap py-[10px] px-1 border-t-2 font-medium text-sm text-center`,
                                )}
                            >
                                <span>{item.icon}</span>
                                <p className={`hover:font-bold mt-[4px] text-center text-sm md:text-base `}>
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}
