import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import InputLabel from '@/component/input/InputLabel';
import InputPassword from '@/component/input/InputPassword';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthRegisterApi } from '@/hook/useAuthApi';

const schema = Yup.object().shape({
    firstname: Yup.string().required('Please enter your user first name'),
    lastname: Yup.string().required('Please enter your user last name'),
    username: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be 6 -12 characters'),
    cPassword: Yup.string()
        .required('Please enter your user cPassword')
        .oneOf([Yup.ref('password')], 'Password incorrect, please try again'),
});

const SignUp = () => {
    const router = useRouter();

    const [errorReq, setErrorReq] = useState('');
    const useAuthRegisterApiMutate = useAuthRegisterApi();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values) => {
        const newValues = {
            firstname: values.firstname,
            lastname: values.lastname,
            username: values.username,
            password: values.password,
        };

        try {
            await useAuthRegisterApiMutate.mutate(newValues, {
                onSuccess: (res) => {
                    console.log('tạo tài khoản thành công', res);
                    router.push('/login');
                    toast.success('Register Success');
                },
                onError: (err) => {
                    console.log('Lỗi', err);
                },
            });
        } catch (error) {}
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:max-w-[600px]  lg:max-w-[500px] w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  shadow-login p-[44px] rounded-2xl"
        >
            <div className="flex justify-center items-center space-x-[8px]">
                <div className="relative h-[35px] w-[35px] ">
                    <Image
                        src="/images/logo.png"
                        layout="fill"
                        objectFit="contain"
                        alt="Logo"
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    />
                </div>
                <div className="text-center text-primary font-bold text-base lg:text-[20px]">
                    <h3 className="mt-[5px]">Ecommerce</h3>
                    <h3>Shop</h3>
                </div>
            </div>

            <h2 className="text-4xl font-bold text-black py-7">Register</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2  justify-between items-center gap-x-2  w-full">
                <InputLabel
                    label="First name"
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    register={register}
                    isErr={errors?.firstname}
                    notication={errors?.firstname?.message}
                />
                <InputLabel
                    label="Last name"
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    register={register}
                    isErr={errors?.lastname}
                    notication={errors?.lastname?.message}
                />
            </div>
            <InputLabel
                label="User name"
                type="text"
                name="username"
                placeholder="Ecommerce-Shop"
                register={register}
                isErr={errors?.username}
                notication={errors?.username?.message}
            />
            <InputPassword
                register={register}
                label="Password"
                name="password"
                isErr={errors?.password}
                notication={errors?.password?.message}
            />
            <InputPassword
                register={register}
                label="cPassword"
                name="cPassword"
                isErr={errors?.cPassword}
                notication={errors?.cPassword?.message}
            />
            {errorReq.length > 0 && <p className="text-center mb-2 text-sm text-red-600">{errorReq}</p>}
            <button type="submit" className="btn-primary">
                Register
            </button>
            <p className="text-center mt-4 ">
                Already have an account ?.
                <Link href={'/login'} className="font-extrabold hover:text-grey_deselect">
                    Login
                </Link>
            </p>
        </form>
    );
};

export default SignUp;
