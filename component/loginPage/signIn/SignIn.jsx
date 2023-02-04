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

const schema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be 6 -12 characters'),
});

const SignIn = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [errorReq, setErrorReq] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    const onSubmit = async (values) => {
        const { ok } = await signIn('credentials', {
            ...values,
            redirect: false,
        });
        if (!ok) {
            setErrorReq('Invalid information');
        } else {
            router.push('/');
            toast.success('Đăng nhập thành công');
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:max-w-[600px]  lg:max-w-[500px] w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  shadow-login p-[44px] rounded-2xl"
        >
            <Link href={'/'} className="flex justify-center items-center space-x-[8px]">
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
            </Link>

            <h2 className="text-4xl font-bold text-black py-7">Sign In</h2>
            <InputLabel
                label="Username"
                type="text"
                name="username"
                defaultValue="kminchelle"
                placeholder="Ecommerce-Shop"
                register={register}
                isErr={errors?.username}
                notication={errors?.username?.message}
            />
            <InputPassword
                register={register}
                //   errors={errors}
                defaultValue="0lelplR"
                label="Password"
                name="password"
                isErr={errors?.password}
                notication={errors?.password?.message}
            />
            {errorReq.length > 0 && <p className="text-center mb-2 text-sm text-red-600">{errorReq}</p>}
            <button type="submit" className="btn-primary">
                Submit
            </button>
            <p className="text-center mt-4 ">
                {"Don't have an account ?."}
                <Link href={'/register'} className="font-extrabold hover:text-grey_deselect">
                    Create an account
                </Link>
            </p>
        </form>
    );
};

export default SignIn;
