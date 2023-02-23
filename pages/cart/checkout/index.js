import CheckoutPage from '@/component/page/checkoutPage/CheckoutPage';
import Protected from '@/component/protected/Protected';
import React from 'react';

const index = () => {
    return (
        <Protected>
            <CheckoutPage />
        </Protected>
    );
};

export default index;
