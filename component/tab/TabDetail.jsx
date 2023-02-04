import React, { useState } from 'react';

import ReactStars from 'react-rating-stars-component';
import { motion } from 'framer-motion';

import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ModalDetail from '../modal/ModalDetail';

const listFeedback = [
    {
        image: '/images/detail/user1.png',
        name: 'John Smith',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        rating: 4,
    },
    {
        image: '/images/detail/user2.png',
        name: 'Eric',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        rating: 5,
    },
    {
        image: '/images/detail/user3.png',
        name: 'MR.BEE',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        rating: 3,
    },
];

const schema = Yup.object().shape({
    email: Yup.string().email().required('Please enter your email'),
    content: Yup.string().required('Please enter your content'),
});

const TabDetail = ({ desc }) => {
    const [tab, setTab] = useState('reviews');
    const [rating, setRating] = useState(5);
    const [isOpen, setIsOpen] = useState(false);
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = (values) => {
        const newValues = { ...values, rating: rating, id: 'chua co session' };
        console.log('values', newValues);

        resetField('email');
        resetField('content');
        setRating(0);
        setIsOpen(true);
    };

    return (
        <div className="lg:mt-[170px]">
            <div className="space-x-6 p-1  mb-10 lg:mb-12">
                <span className={`tab-detail ${tab === 'desc' && 'text-danger'}`} onClick={() => setTab('desc')}>
                    Description
                </span>
                <span className={`tab-detail ${tab === 'reviews' && 'text-danger'}`} onClick={() => setTab('reviews')}>
                    Reviews
                </span>
            </div>

            {tab === 'desc' && (
                <div className=" rounded-md p-3 bg-gray-100 mb-10 lg:mb-12 ">
                    <h3 className=" font-medium leading-5">{desc}</h3>
                </div>
            )}

            {tab === 'reviews' && (
                <div>
                    {listFeedback.map((item, index) => (
                        <div key={index} className="rounded-md p-3 bg-gray-100 mb-2">
                            <div className="flex items-center gap-4">
                                <div className="relative h-[40px] w-[40px]  ">
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        objectFit="contain"
                                        alt="image-user"
                                        className="rounded-full"
                                        sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span>{item.name}</span>
                                    <div className="flex items-center gap-4">
                                        <ReactStars size={20} value={item.rating} edit={false} />
                                        <span>({item.rating} Rating)</span>
                                    </div>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <form className="my-10 bg-gray-100 shadow py-4 text-center" onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="text-xl font-semibold mb-4">Leave your experience</h4>

                            <div className="mb-4 px-4 flex flex-col">
                                <label htmlFor="email" className="text-primary mb-1 text-left">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="input h-10"
                                    placeholder="you@example.com"
                                    {...register('email')}
                                />
                                {errors?.email && (
                                    <p className="text-danger font-medium  pt-[5px] text-left">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-4 px-4">
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    value={rating}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                                <span className="mt-1"> ({rating} Rating)</span>
                            </div>
                            <div className="flex flex-col mt-4 px-4">
                                <label htmlFor="content" className="text-primary mb-1 text-left">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="5"
                                    cols="50"
                                    className="input"
                                    {...register('content')}
                                ></textarea>
                                {errors?.content && (
                                    <p className="text-danger font-medium  pt-[5px] text-left">
                                        {errors?.content?.message}
                                    </p>
                                )}
                            </div>
                            <div className="px-4 mt-8">
                                <motion.button
                                    whileTap={{ scale: 1.5 }}
                                    type="submit"
                                    className="btn-outline  w-full lg:w-[40%]  "
                                >
                                    Submit
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ModalDetail isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default TabDetail;
