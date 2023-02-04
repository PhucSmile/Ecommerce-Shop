import { Container } from '@/component/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import { Popover, Transition } from '@headlessui/react';

import React, { Fragment, useRef, useState } from 'react';
import { IconCart, IconHead, IconMenu } from '@/assets/svg';
import { useSession } from 'next-auth/react';
import ProfileUser from '@/component/profileUser/ProfileUser';

const navLinks = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Shop',
        path: '/shop',
    },
    {
        display: 'Cart',
        path: '/cart',
    },
    {
        display: 'Contact',
        path: '/contact',
    },
];

export function Header() {
    const { data: session, status } = useSession();
    console.log('user', session);
    const router = useRouter();
    const currentRoute = router.pathname;
    const menuRef = useRef(null);

    const [stickyScroll, setStickyScroll] = useState(false);
    console.log('currentRoute', currentRoute);

    // window.onScroll = () => {
    //     setStickyScroll(window.scrollY > 80 ? true : false);
    //     // clearUp
    //     return () => window.onScroll(null);
    // };

    const menuToggle = () => {
        menuRef.current.classList.toggle('active__nav-link');
    };

    return (
        <header className={`shadow-header ${stickyScroll ? 'sticky-scroll' : ''}`}>
            <Container>
                <div className=" flex justify-between items-center py-2 ">
                    {/* logo */}
                    <Link href={'/'}>
                        <div className="flex items-center space-x-[8px]">
                            <div className="relative h-[35px] w-[35px] ">
                                <Image
                                    src="/images/logo.png"
                                    layout="fill"
                                    objectFit="contain"
                                    alt="Logo"
                                    sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                                />
                            </div>
                            <div className="hidden md:block text-center text-primary font-bold text-base lg:text-[20px]">
                                <h3 className="mt-[5px]">Ecommerce</h3>
                                <h3>Shop</h3>
                            </div>
                        </div>
                    </Link>

                    {/* Menu */}
                    <div className="navigation hidden lg:block nav__link  text-primary" ref={menuRef}>
                        <div className="navigation__overlay" onClick={menuToggle}></div>

                        <div className="menu space-x-0 lg:space-x-[30px]">
                            {navLinks.map((item, index) => (
                                <span key={index} className={currentRoute === item.path ? 'active__nav-link ' : null}>
                                    <Link href={item.path}>{item.display}</Link>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <motion.span whileTap={{ scale: 1.2 }} className="block w-7 h-7 relative cursor-pointer">
                            <IconHead />
                            <span className="badge">12</span>
                        </motion.span>

                        <motion.span whileTap={{ scale: 1.2 }} className="block w-7 h-7 relative cursor-pointer">
                            <IconCart />
                            <span className="badge">1</span>
                        </motion.span>

                        <ProfileUser session={session?.user} />

                        <div className="lg:hidden">
                            <span className="cursor-pointer w-6 h-6" onClick={menuToggle}>
                                <IconMenu />
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
