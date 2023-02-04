import SignIn from '@/component/loginPage/signIn/SignIn';
import NestedLayout from '@/layout/NestedLayout';
import React from 'react';

export default function index() {
    return <SignIn />;
}

index.getLayout = function (page) {
    return <NestedLayout>{page}</NestedLayout>;
};
