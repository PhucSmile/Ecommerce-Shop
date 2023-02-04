import { HiChevronDown } from 'react-icons/hi';
import { HiChevronRight } from 'react-icons/hi';

import React from 'react';
import SubMenu from '../menu/SubMenu';

const ListMenu = [
    {
        title: 'Hồ sơ',
        icon: '/images/header/profile/1.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Thông tin cá nhân',
                icon: '',
                path: '',
            },
        ],
    },
    {
        title: 'Danh sách theo dõi',
        icon: '/images/header/profile/2.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
    },
    {
        title: 'Thanh toán',
        icon: '/images/header/profile/3.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Lịch sử thanh toán',
                icon: '',
                path: '/history-payment',
            },
            {
                title: 'Cài đặt thanh toán',
                icon: '',
                path: '/payment-setting',
            },
        ],
    },
    {
        title: 'Hỗ trợ',
        icon: '/images/header/profile/5.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Câu hỏi phổ biến',
                icon: '',
                path: '/support/FAQ',
            },
            {
                title: 'Chính sách sử dụng',
                icon: '',
                path: '/support/usage-policy',
            },
            {
                title: 'Ticket khiếu nại',
                icon: '',
                path: '',
            },
            {
                title: 'Chăm sóc khách hàng',
                icon: '',
                path: '',
            },
            {
                title: 'Về chúng tôi',
                icon: '',
                path: '',
            },
        ],
    },
    {
        title: 'Cài đặt',
        icon: '/images/header/profile/6.svg',
        path: '',
        iconOpen: <HiChevronDown />,
        iconClose: <HiChevronRight />,
        subNav: [
            {
                title: 'Báo lỗi/ góp ý',
                icon: '',
                path: '',
            },
            {
                title: 'Thông báo',
                icon: '',
                path: '',
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
