import PaymentSettingPage from '@/component/page/paymentSettingPage/PaymentSettingPage';
import Protected from '@/component/protected/Protected';

import React from 'react';

const index = () => {
    return (
        <Protected>
            <PaymentSettingPage />
        </Protected>
    );
};

export default index;
