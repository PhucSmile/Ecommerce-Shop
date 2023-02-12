import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { Container } from '@/component/common';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import React from 'react';

const path = {
    pathOne: 'home',
    pathTwo: 'cart',
    pathThree: 'checkout',
};

const CheckoutPage = () => {
    return (
        <Helmet title="checkout">
            <Container>
                <Breadcrumb path={path} />
            </Container>
            <CommonSection title={'Checkout'} image={'/images/common/checkoutpng.webp'} />
            <section>
                <Container>
                    <div>a</div>
                </Container>
            </section>
        </Helmet>
    );
};

export default CheckoutPage;
