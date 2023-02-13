import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { Container } from '@/component/common';
import CommonSection from '@/component/common/CommonSection';
import Helmet from '@/component/common/Helmet';
import React, { useEffect, useState } from 'react';
import InforOrder from '../cartPage/InforOrder';
import { useSelector } from 'react-redux';
import { getDataCartItems } from '@/store/slice/useCart';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '@/component/input/InputLabel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const path = {
    pathOne: 'home',
    pathTwo: 'cart',
    pathThree: 'checkout',
};

const schema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    phoneNumber: Yup.number().required('Please enter your phone number'),
    address: Yup.string().required('Please enter your address'),
    content: Yup.string(),
});

const CheckoutPage = () => {
    const dataCartCheckout = useSelector(getDataCartItems);
    const [dataCart, setDataCart] = useState([]);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (dataCartCheckout) {
            setDataCart(dataCartCheckout);
        }
    }, [dataCartCheckout]);
    console.log('dataCart', dataCart);

    const onSubmit = (values) => {
        console.log('values', values);
        toast.success('Buy Successful');
        router.push('/');
    };
    return (
        <Helmet title="checkout">
            <Container>
                <Breadcrumb path={path} />
            </Container>
            <CommonSection title={'Checkout'} image={'/images/common/checkoutpng.webp'} />
            <section>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-9">
                                <div className="lg:w-[80%]">
                                    <InputLabel
                                        label="User Name"
                                        type="text"
                                        name="username"
                                        register={register}
                                        isErr={errors?.username}
                                        notication={errors?.username?.message}
                                    />
                                    <InputLabel
                                        label="Phone Number"
                                        type="number"
                                        name="phoneNumber"
                                        register={register}
                                        isErr={errors?.phoneNumber}
                                        notication={errors?.phoneNumber?.message}
                                    />
                                    <InputLabel
                                        label="Address"
                                        type="text"
                                        name="address"
                                        register={register}
                                        isErr={errors?.address}
                                        notication={errors?.address?.message}
                                    />
                                    <InputLabel
                                        label="Address"
                                        type=""
                                        name="address"
                                        register={register}
                                        isErr={errors?.address}
                                        notication={errors?.address?.message}
                                    />
                                    <div className="flex flex-col mt-4 ">
                                        <label htmlFor="content" className="text-primary font-semibold mb-1 text-left">
                                            Content
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            rows="5"
                                            cols="50"
                                            className="input bg-[#F3F4F9]"
                                            {...register('content')}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-5 lg:col-span-3 mt-6 lg:mt-0">
                                <InforOrder
                                    totalQuantityCart={dataCart?.totalQuantity}
                                    totalAmountCart={dataCart?.total}
                                    discountedTotal={dataCart?.discountedTotal}
                                    // handleCheckout={handleBuy}
                                />
                            </div>
                        </div>
                    </form>
                </Container>
            </section>
        </Helmet>
    );
};

export default CheckoutPage;
