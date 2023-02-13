import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { Container } from '@/component/common';
import Helmet from '@/component/common/Helmet';
import React from 'react';

const path = {
    pathOne: 'home',
    pathTwo: 'profile',
};
const Profile = () => {
    return (
        <Helmet title="title">
            <Container>
                <Breadcrumb path={path} />
            </Container>
        </Helmet>
    );
};

export default Profile;
