import { Container } from '@/component/common';
import Helmet from '@/component/common/Helmet';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { InforAccount } from '.';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/hook/useAuthApi';
import Loading from '@/component/common/Loading';
import FormAccount from '@/component/input/FormAccount';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const Profile = () => {
    let [categories] = useState([
        {
            name: 'User information',
        },
        {
            name: 'Orders history',
        },
        {
            name: 'Bank account',
        },
    ]);
    const { data: session } = useSession();
    const { data: dataProfile, isLoading } = useAuth(session?.user?.id);
    console.log('dataProfile', dataProfile?.data);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Helmet title="title">
            <div className="bg-white w-full">
                <div className="relative pb-32 py-48">
                    <div className="absolute inset-0">
                        <div className="relative w-full h-full ">
                            <Image src="/images/common/image-profile.jpg" layout="fill" objectFit="cover" alt="Logo" />
                        </div>
                    </div>
                </div>
                <Container className="-mt-32 w-full relative z-10 pb-32">
                    <div className="w-full grid grid-cols-3 gap-x-8">
                        <div className="col-span-1">
                            <InforAccount data={dataProfile?.data} />
                        </div>
                        <div className="col-span-2 bg-white rounded-2xl shadow-xl ">
                            <div className="w-full my-4 p-6">
                                <Tab.Group>
                                    <Tab.List className="flex justify-evenly items-center bg-[#F3F4F9] px-4">
                                        {categories.map((category) => (
                                            <Tab
                                                key={category}
                                                className={({ selected }) =>
                                                    classNames(
                                                        'relative rounded-lg py-4 text-[#637381] text-base xl:text-lg inline-block font-SamsungOne600C font-normal mx-4',
                                                        selected
                                                            ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-Orange after:transition-all after:duration-300  '
                                                            : ' hover:text-black after:content-[""] after:absolute after:bottom-0 after:left-2/4 after:right-2/4 after:h-[2px] after:bg-Orange after:transition-all after:duration-300 hover:after:left-0 hover:after:right-0',
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    <Tab.Panels className="mt-2">
                                        <Tab.Panel
                                            className={classNames(
                                                'rounded-xl bg-white p-3',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            )}
                                        >
                                            <FormAccount />
                                        </Tab.Panel>
                                        <Tab.Panel
                                            className={classNames(
                                                'rounded-xl bg-white p-3',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            )}
                                        >
                                            <div>PersonalAccount</div>
                                        </Tab.Panel>
                                        <Tab.Panel
                                            className={classNames(
                                                'rounded-xl bg-white p-3',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            )}
                                        >
                                            <div>BankAccount</div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </Helmet>
    );
};

export default Profile;
