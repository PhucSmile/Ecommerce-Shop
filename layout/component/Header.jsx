import { Container } from '@/component/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import React, { useEffect, useRef, useState } from 'react';
import { IconCart, IconClose, IconMenu } from '@/assets/svg';
import { useSession } from 'next-auth/react';
import ProfileUser from '@/component/profileUser/ProfileUser';
import FilterFromSearch from '@/component/filterFormSearch/FilterFormSearch';
import { useSelector } from 'react-redux';
import { getTotalQuantity } from '@/store/slice/useCart';

export function Header() {
    const { data: session, status } = useSession();
    // console.log('user', session);
    const router = useRouter();
    const currentRoute = router.pathname;
    const menuRef = useRef(null);
    const quantityCart = useSelector(getTotalQuantity);

    const [stickyScroll, setStickyScroll] = useState(false);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(quantityCart);
    }, [quantityCart]);

    useEffect(() => {
        function onScroll() {
            setStickyScroll(window.scrollY > 69);
        }
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const menuToggle = () => {
        menuRef.current.classList.toggle('active__nav-link');
    };

    return (
        <header className={`shadow-header bg-[#ffffffcc] ${stickyScroll ? 'sticky-scroll' : ''}`}>
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
                            <div className="hidden lg:block text-center text-primary font-bold text-base lg:text-[20px]">
                                <h3 className="mt-[5px]">Ecommerce</h3>
                                <h3>Shop</h3>
                            </div>
                        </div>
                    </Link>

                    {/* Menu */}
                    <div className="navigation hidden md:block nav__link  text-primary" ref={menuRef}>
                        <div className="navigation__overlay z-10" onClick={menuToggle}></div>

                        <div className="menu z-20">
                            <span className="flex md:hidden items-center mb-4 cursor-pointer" onClick={menuToggle}>
                                <IconClose className="w-8 h-8" /> close
                            </span>
                            <FilterFromSearch />
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <Link href={'/cart'}>
                            <motion.span whileTap={{ scale: 1.2 }} className="block w-7 h-7 relative cursor-pointer">
                                <IconCart />
                                {quantity > 0 && <span className="badge">{quantity}</span>}
                            </motion.span>
                        </Link>

                        <ProfileUser session={session?.user} />

                        <div className="md:hidden">
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
