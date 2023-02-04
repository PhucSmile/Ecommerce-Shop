import { IconArrowDown, IconLogout } from '@/assets/svg';
import { Menu, Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment } from 'react';
import MenuList from '../menuList/MenuList';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const ProfileUser = ({ session }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary bg-opacity-20 p-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {session ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={session?.image || '/images/user-icon.png'}
                                alt=""
                                className="h-[30px] w-[30px] rounded-full cursor-pointer"
                            />
                            <span>{session?.firstName || session?.email}</span>
                            <span>
                                <IconArrowDown />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <Link href={'/login'}>
                                <img
                                    src="/images/user-icon.png"
                                    alt=""
                                    className="h-[30px] w-[30px] rounded-full cursor-pointer"
                                />
                            </Link>
                        </div>
                    )}
                </Menu.Button>
            </div>
            {session && (
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-4 w-[300px] overflow-hidden shadow-2xl rounded-l-2xl rounded-b-2xl bg-white focus:outline-none px-6 py-5 z-[90] flex flex-col gap-4">
                        <Menu.Item>
                            <MenuList />
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className="flex items-end gap-[10px] text-base text-primary font-semibold cursor-pointer"
                                    onClick={() => signOut()}
                                >
                                    <span>
                                        <IconLogout />
                                    </span>
                                    Đăng xuất
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            )}
        </Menu>
    );
};

export default ProfileUser;