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
import GoogleMaps from '@/component/maps/GoogleMaps';
import Geocode from '@/component/utils/configGeocode';

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
    const [valueLocation, setValueLocation] = useState({
        address: null,
        lat: null,
        lng: null,
    });

    const {
        register,
        handleSubmit,
        setValue,
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

    const handleChangeGoogle = (value) => {
        // get ADDRESS from lat & lng values
        Geocode.fromLatLng(value.lat(), value.lng()).then(
            (response) => {
                const address = response.results[0].formatted_address;

                setValueLocation({
                    address: address,
                    lat: value.lat(),
                    lng: value.lng(),
                });
                setValue('address', address);
            },
            (error) => {
                console.error(error);
            },
        );
    };

    const onSubmit = (values) => {
        console.log('values', values);
        toast.success('Buy Successful');
        router.push('/');
    };
    return (
        <Helmet title="checkout">
            <Container>
                <div className="mt-11 mb-5 lg:mt-[78px] lg:mb-[42px]">
                    <Breadcrumb path={path} />
                </div>
            </Container>
            <CommonSection title={'Checkout'} image={'/images/common/checkoutpng.webp'} />
            <section>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-8 ">
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

                                    <GoogleMaps
                                        height="400px"
                                        onChange={handleChangeGoogle}
                                        value={
                                            valueLocation.lat && valueLocation.lng
                                                ? { lat: valueLocation.lat, lng: valueLocation.lng }
                                                : null
                                        }
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
                            <div className="col-span-12 md:col-span-4  mt-6 lg:mt-0">
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
