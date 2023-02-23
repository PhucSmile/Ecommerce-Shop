import Profile from '@/component/page/profile/Profile';
import Protected from '@/component/protected/Protected';
import React from 'react';

const index = () => {
    return (
        <Protected>
            <Profile />
        </Protected>
    );
};

export default index;
