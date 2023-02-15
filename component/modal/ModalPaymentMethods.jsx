import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Payment from '../payment/Payment';

const ModalPaymentMethods = ({ setIsOpenModal1, isOpenModal1, setIsOpenModal2, setAddPayment }) => {
    return (
        <>
            <Transition appear show={isOpenModal1} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpenModal1(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[675px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        {/* Pay */}
                                        <Payment
                                            setIsOpenModal1={setIsOpenModal1}
                                            setIsOpenModal2={setIsOpenModal2}
                                            setAddPayment={setAddPayment}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalPaymentMethods;
