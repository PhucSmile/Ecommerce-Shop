import { Dialog, Transition } from '@headlessui/react';
import { IconCancel } from 'assets/svg';
import { Fragment, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { toast } from 'react-toastify';
import InputLabel from '../input/InputLabel';
import InputSelect from '../input/InputSelect';

const listImagePayment = [
    {
        url: '/images/payment/JCB.png',
        with: 'w-[31px]',
        height: 'h-[25px]',
    },
    {
        url: '/images/payment/mastercard.png',
        with: 'w-[30px]',
        height: 'h-[24px]',
    },
    {
        url: '/images/payment/visa.png',
        with: 'w-[51px]',
        height: 'h-[17px]',
    },
];

const ModalAddPayment = ({ isOpenModal2, setIsOpenModal2, addPayment }) => {
    const [selectedBank, setSelectedBank] = useState(null);

    const schema = Yup.object().shape({
        user: Yup.string().required('Please enter this field'),
        userNumber: Yup.string().required('Please enter this field'),
        // thêm thẻ
        date: !addPayment && Yup.string().required('Please enter this field'),
        cvv: !addPayment && Yup.string().required('Please enter this field'),
        // thêm tài khoản
        branch: addPayment && Yup.string().required('Please enter this field'),
    });

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values) => {
        // const newValues = { ...values, nameBank: selectedBank.value };
        console.log('submit', values);
        toast.success('Add card successfully ');
        resetField('user');
        resetField('userNumber');
        resetField('date');
        resetField('cvv');
        resetField('branch');
        setIsOpenModal2(false);
    };

    return (
        <Transition appear show={isOpenModal2} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpenModal2(false)}>
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
                            <Dialog.Panel className="w-full max-w-[675px] transform overflow-hidden rounded-2xl bg-white px-6 pt-6 text-left align-middle shadow-xl transition-all">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex justify-between items-center ">
                                        <h4 className="text-xl font-semibold">
                                            {addPayment ? 'Add a bank account' : 'Add card'}
                                        </h4>
                                        <span className="cursor-pointer" onClick={() => setIsOpenModal2(false)}>
                                            <IconCancel />
                                        </span>
                                    </div>
                                    {addPayment && (
                                        <div className="flex items-center gap-4 mt-4">
                                            {listImagePayment.map((item, i) => {
                                                return (
                                                    <div key={i} className={`relative ${item.with} ${item.height} `}>
                                                        <Image src={item.url} layout="fill" objectFit="contain" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <div className="p-[14px] bg-[#E4F6EF] rounded my-4">
                                        <h5 className="font-semibold mb-1">Your card information is secure</h5>
                                        <p className="font-normal text-sm">
                                            Your card information is safe and absolutely secure by Ecommerce.
                                        </p>
                                    </div>
                                    <InputLabel
                                        label="Account name"
                                        type="text"
                                        name="user"
                                        placeholder="Vd: NGUYEN VAN A"
                                        register={register}
                                        isErr={errors?.user}
                                        notication={errors?.user?.message}
                                    />
                                    <InputLabel
                                        label="Account number"
                                        type="number"
                                        name="userNumber"
                                        register={register}
                                        isErr={errors?.userNumber}
                                        notication={errors?.userNumber?.message}
                                    />
                                    {addPayment ? (
                                        <>
                                            <InputSelect
                                                label="Bank name"
                                                selected={selectedBank}
                                                setSelected={setSelectedBank}
                                                errors={errors}
                                            />
                                            <InputLabel
                                                label="Branch name"
                                                type="text"
                                                name="branch"
                                                register={register}
                                                isErr={errors?.branch}
                                                notication={errors?.branch?.message}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col  mb-4">
                                                <label htmlFor="date" className="mb-2">
                                                    Expiration date<span className="text-red-700">*</span>
                                                </label>
                                                <div className="flex items-center gap-[21px]">
                                                    <input
                                                        type="number"
                                                        id="date"
                                                        placeholder="MM"
                                                        name="date"
                                                        {...register('date')}
                                                        className="bg-[#F3F4F9] py-[10px] w-[44px] h-[44px] rounded-md text-center focus:outline-none "
                                                    />
                                                    <input
                                                        type="number"
                                                        id="date"
                                                        placeholder="YY"
                                                        name="date"
                                                        {...register('date')}
                                                        className="bg-[#F3F4F9] py-[10px] w-[44px] h-[44px] rounded-md text-center focus:outline-none "
                                                    />
                                                </div>
                                                {errors?.date && (
                                                    <p className="mt-2 text-sm text-red-600">{errors?.date?.message}</p>
                                                )}
                                            </div>
                                            <InputLabel
                                                label="Code CVV"
                                                type="text"
                                                name="cvv"
                                                register={register}
                                                isErr={errors?.cvv}
                                                notication={errors?.cvv?.message}
                                            />
                                        </>
                                    )}
                                    <div className="flex items-center gap-[10px]  py-6 shadow">
                                        <button className="btn-outline w-full" onClick={() => setIsOpenModal2(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-primary w-full">
                                            Completed
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalAddPayment;
