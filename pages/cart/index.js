import dynamic from 'next/dynamic';
import React from 'react';

const CartPage = dynamic(() => import('@/component/page/cartPage/CartPage').then((module) => module), {
    ssr: false,
});

const index = () => {
    return <CartPage />;
};

export default index;
