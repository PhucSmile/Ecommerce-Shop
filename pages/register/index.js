import SignUp from '@/component/page/loginPage/signUp/SignUp';
import NestedLayout from '@/layout/NestedLayout';
import React from 'react';

export default function index() {
    return <SignUp />;
}

index.getLayout = function (page) {
    return <NestedLayout>{page}</NestedLayout>;
};
