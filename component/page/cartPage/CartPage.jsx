import { Container } from '@/component/common';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import Table from '@/component/table/Table';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatPrice } from '@/component/utils/helpers';
import { useSession } from 'next-auth/react';
import { useGetCartApi, useGetCartUserApi } from '@/hook/useCartApi';
import Loading from '@/component/common/Loading';
import { useSelector } from 'react-redux';
import { getAllCarts, getTotalAmount, getTotalQuantity } from '@/store/slice/useCart';

const CartPage = () => {
    const [data, setData] = useState([]);
    const [totalQuantityCart, setTotalQuantityCart] = useState(0);
    const [totalAmountCart, setTotalAmountCart] = useState(0);
    const dataCarts = useSelector(getAllCarts);
    const totalQuantity = useSelector(getTotalQuantity);
    const totalAmount = useSelector(getTotalAmount);

    useEffect(() => {
        setData(dataCarts);
        setTotalQuantityCart(totalQuantity);
        setTotalAmountCart(totalAmount);
    }, [dataCarts, totalQuantity, totalAmount]);

    return (
        <Helmet title="title">
            <CommonSection title={'Shopping Cart'} image={'/images/common/cart.png'} />
            <section>
                <Container>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-9">
                            <Table data={data} />
                        </div>
                        <div className="col-span-12 md:col-span-5 lg:col-span-3 ">
                            {' '}
                            <div className="shadow-xl p-2">
                                <div className="flex justify-between items-center">
                                    <h6>Total quantity:</h6>
                                    <span className="text-xl lg:text-xl font-bold">{totalQuantityCart}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h6>Subtotal:</h6>
                                    <span className="text-xl lg:text-xl font-bold">{formatPrice(totalAmountCart)}</span>
                                </div>

                                <p className="text-grey_deselect  mt-2">
                                    Note: taxes and shipping will calculate in checkout
                                </p>

                                <div className="flex justify-center items-center flex-col gap-4 my-6">
                                    <motion.button whileTap={{ scale: 1.2 }} className="btn-primary w-full">
                                        <Link href={'/checkout'}>Checkout</Link>
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 1.2 }} className="btn-outline w-full">
                                        <Link href={'/search'}>Continue Shopping</Link>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </Helmet>
    );
};

export default CartPage;
