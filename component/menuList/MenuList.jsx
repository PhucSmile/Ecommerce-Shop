import { HiChevronDown } from 'react-icons/hi';
import { HiChevronRight } from 'react-icons/hi';

import React from 'react';
import SubMenu from '../menu/SubMenu';

const ListMenu = [
    {
        title: 'Profile',
        icon: '/images/header/profile/1.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'User information',
                icon: '',
                path: '/profile',
            },
        ],
    },

    {
        title: 'Payment',
        icon: '/images/header/profile/3.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'History payment',
                icon: '',
                path: '',
            },
            {
                title: 'Setting payment',
                icon: '',
                path: '/payment/payment-setting',
            },
        ],
    },
    {
        title: 'Help',
        icon: '/images/header/profile/5.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Feedback',
                icon: '',
                path: '/feedback',
            },
        ],
    },
    {
        title: 'Settings',
        icon: '/images/header/profile/6.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Notification',
                icon: '',
                path: '/notification',
            },
        ],
    },
];

export default function MenuList() {
    return (
        <>
            {ListMenu.map((item, index) => {
                return <SubMenu item={item} key={index} />;
            })}
        </>
    );
}
