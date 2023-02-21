import React, { Fragment, useEffect, useRef, useState } from 'react';
import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Container } from '@/component/common';
import Goback from '@/component/goBack/Goback';
import InputUpload from '@/component/input/InputUpload';
import InputLabel from '@/component/input/InputLabel';
import InputSelect from '@/component/input/InputSelect';

const path = {
    pathOne: 'home',
    pathTwo: 'help',
    pathThree: 'feedback',
};

const listSelect = [
    {
        name: 'Payment',
        value: 'Payment',
    },
    {
        name: 'Login/Logout',
        value: 'Login/Logout',
    },
    {
        name: 'Page not available',
        value: 'Page not available',
    },
    {
        name: 'Verification',
        value: 'Verification',
    },
];

const schema = Yup.object().shape({
    userName: Yup.string().required('This field is required'),
    email: Yup.string().required('This field is required'),
    content: Yup.string().required('This field is required'),
    url: Yup.string(),
});

const FeedbackPage = () => {
    const { data: session } = useSession();
    const formElemt = useRef();

    const [selected, setSelected] = useState();
    const [fileList, setFileList] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (session?.user) {
            setValue('userName', session.user?.username);
            setValue('email', session.user?.email);
        }
    }, [session]);

    const onSubmit = async (values) => {
        const newValues = {
            userName: values.userName,
            email: values.email,
            content: values.content,
            problem: selected?.value,
            url: fileList,
        };
        console.log('newValues', newValues);
        toast.success('Send success ');
        resetField('email');
        resetField('url');
        resetField('userName');
        resetField('content');
        setSelected(null);
        setFileList([]);
    };

    return (
        <>
            <Container>
                {/* Breadcrumb */}
                <div className="mt-11 mb-5 lg:mt-[78px] lg:mb-[42px]">
                    <Breadcrumb path={path} />
                </div>
                <Goback title="Feedback" />
                <div className="flex justify-center items-center mt-[31px] mb-[89px] gap-11 ">
                    <form ref={formElemt} onSubmit={handleSubmit(onSubmit)} className="max-w-[890px] w-full ">
                        <div className="mb-4">
                            <InputLabel
                                placeholder={'Name (*)'}
                                type="text"
                                name="userName"
                                register={register}
                                isErr={errors?.userName}
                                notication={errors?.userName?.message}
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                placeholder={'Email (*)'}
                                type="email"
                                name="email"
                                register={register}
                                isErr={errors?.email}
                                notication={errors?.email?.message}
                            />
                        </div>

                        <div className="mb-4">
                            <InputSelect
                                label="What are you having problems with?"
                                selected={selected}
                                setSelected={setSelected}
                                errors={errors.email}
                                listSelect={listSelect}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                                Detailed description
                            </label>
                            <textarea
                                className="border-[#EDEDED] border-w-[1px] border rounded w-full py-[10px] px-[10px] text-gray-700 focus:outline-none focus:shadow-outline"
                                id="message"
                                type="textarea"
                                placeholder="Please enter your question (max 1000 words)"
                                rows="5"
                                {...register('content')}
                            />
                            {errors?.content && (
                                <p className="text-[#67728A] font-normal pt-[8px]">{errors?.content?.message}</p>
                            )}
                        </div>

                        <InputUpload fileList={fileList} setFileList={setFileList} name="image" register={register} />

                        <div className="mt-[22px] py-6 flex items-center gap-[10px] border-t-[1px]">
                            <button
                                className="btn-outline text-lg font-extrabold w-full"
                                onClick={() => {
                                    resetField('email');
                                    resetField('image');
                                    resetField('name');
                                    resetField('content');
                                    setSelected(null);
                                    setFileList([]);
                                }}
                            >
                                Cancel
                            </button>
                            <button className="btn-primary text-white  text-lg font-extrabold w-full" type="submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default FeedbackPage;
