import { Container } from '@/component/common';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import Table from '@/component/table/Table';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatPrice } from '@/component/utils/helpers';
import { useSession } from 'next-auth/react';
import { useGetCartApi } from '@/hook/useCartApi';

const CartPage = () => {
    const { data: session } = useSession();
    const { data } = useGetCartApi(session?.user?.id);
    console.log('data', data?.data?.carts[0]);

    return (
        <Helmet title="title">
            <CommonSection title={'Shopping Cart'} image={'/images/common/cart.png'} />
            <section>
                <Container>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-9">
                            <Table data={data?.data?.carts[0]?.products} userId={data?.data?.carts[0].userId} />
                        </div>
                        <div className="col-span-3 ">
                            {' '}
                            <div className="shadow-xl p-2">
                                <div className="flex justify-between items-center">
                                    <h6>Total products:</h6>
                                    <span className="text-xl lg:text-3xl font-bold">
                                        {data?.data?.carts[0].totalProducts}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h6>Total quantity:</h6>
                                    <span className="text-xl lg:text-3xl font-bold">
                                        {data?.data?.carts[0].totalQuantity}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <h6>Subtotal:</h6>
                                    <span className="text-xl lg:text-3xl font-bold">
                                        {formatPrice(data?.data?.carts[0].total)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h6>Discounted total:</h6>
                                    <span className="text-xl lg:text-3xl font-bold">
                                        {formatPrice(data?.data?.carts[0].discountedTotal)}
                                    </span>
                                </div>
                                <p className="text-grey_deselect  mt-2">
                                    Note: taxes and shipping will calculate in checkout
                                </p>

                                <div className="flex justify-center items-center flex-col gap-4 my-6">
                                    <motion.button whileTap={{ scale: 1.2 }} className="btn-primary w-[228px]">
                                        <Link href={'/checkout'}>Checkout</Link>
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 1.2 }} className="btn-outline w-[228px]">
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
