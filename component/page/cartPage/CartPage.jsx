import { Container } from '@/component/common';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import Table from '@/component/table/Table';
import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useAddCartApi } from '@/hook/useCartApi';

import { useDispatch, useSelector } from 'react-redux';
import { cartCheckout, getAllCarts, getTotalAmount, getTotalQuantity } from '@/store/slice/useCart';
import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { useRouter } from 'next/router';
import Loading from '@/component/common/Loading';
import InforOrder from './InforOrder';

const path = {
    pathOne: 'home',
    pathTwo: 'cart',
};

const CartPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [data, setData] = useState([]);
    const [totalQuantityCart, setTotalQuantityCart] = useState(0);
    const [totalAmountCart, setTotalAmountCart] = useState(0);
    const dataCarts = useSelector(getAllCarts);
    const totalQuantity = useSelector(getTotalQuantity);
    const totalAmount = useSelector(getTotalAmount);

    const dispatch = useDispatch();
    // API
    const useAddCartApiMutate = useAddCartApi();

    useEffect(() => {
        setData(dataCarts);
        setTotalQuantityCart(totalQuantity);
        setTotalAmountCart(totalAmount);
    }, [dataCarts, totalQuantity, totalAmount]);

    const handleCheckout = async () => {
        try {
            const changeData = data.map((data) => {
                return { id: data.id, quantity: data.quantity };
            });
            const newData = {
                userId: session?.user?.id,
                products: changeData,
            };

            await useAddCartApiMutate.mutate(newData, {
                onSuccess: async (res) => {
                    console.log('res', res);
                    await dispatch(cartCheckout(res));
                    router.push('/cart/checkout');
                },
            });
        } catch (error) {}
    };

    if (useAddCartApiMutate.isLoading) {
        return <Loading />;
    }

    return (
        <Helmet title="title">
            <Container>
                <Breadcrumb path={path} />
            </Container>
            <CommonSection title={'Shopping Cart'} image={'/images/common/cart.png'} />
            <section>
                <Container>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-9">
                            <Table data={data} />
                        </div>
                        <div className="col-span-12 md:col-span-5 lg:col-span-3 ">
                            <InforOrder
                                totalQuantityCart={totalQuantityCart}
                                totalAmountCart={totalAmountCart}
                                handleCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </Helmet>
    );
};

export default CartPage;
