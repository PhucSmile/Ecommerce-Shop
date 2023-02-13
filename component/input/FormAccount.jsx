import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import InputLabel from './InputLabel';
import { useState } from 'react';

import InputPassword from './InputPassword';
const schema = Yup.object().shape({
    name: Yup.string().required('Please enter your user name'),
    province: Yup.string().required('Please enter your province'),
    district: Yup.string().required('Please enter your district'),
    wards: Yup.string().required('Please enter your wards'),
    sex: Yup.string(),
    email: Yup.string().required('Please enter your user email'),
    phoneNumber: Yup.number().required('Please enter your phone number'),
    password: Yup.string().required('Please enter your user password'),
});
const FormAccount = () => {
    const [startDate, setStartDate] = useState(new Date());
    const options = [
        {
            label: 'Cà Mau',
            value: 'CaMau',
        },
        {
            label: 'Cà Mau',
            value: 'CaMau',
        },
        {
            label: 'Cà Mau',
            value: 'CaMau',
        },
        {
            label: 'Cà Mau',
            value: 'CaMau',
        },
        {
            label: 'Cà Mau',
            value: 'CaMau',
        },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitInfo = (data) => {
        console.log(data);
    };
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmitInfo)}>
                <div className="grid grid-cols-10">
                    <div className="col-span-6 border-r-2 my-10">
                        <h2 className="text-[#333333] font-bold text-2xl">User information</h2>
                        <div className="w-full">
                            <div className="w-[90%] py-2">
                                <div>
                                    <InputLabel
                                        placeholder={'Full name'}
                                        type="text"
                                        name="name"
                                        register={register}
                                        isErr={errors?.name}
                                        notication={errors?.name?.message}
                                    />
                                </div>
                            </div>
                            <div className="w-full py-2">
                                <div className="w-full relative">
                                    <ReactDatePicker
                                        className={`bg-[#F3F4F9] w-[90%] p-[10px] rounded-lg`}
                                        placeholderText="Year of Birth"
                                        onChange={(date) => setStartDate(date)}
                                        selected={startDate}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <img
                                        src="/images/svg/date.svg"
                                        alt=""
                                        className="absolute right-16 top-[10px] w-5 h-5"
                                    />
                                </div>
                            </div>
                            <div className="w-[90%] py-2">
                                <InputLabel
                                    placeholder={'Province'}
                                    type="text"
                                    name="province"
                                    register={register}
                                    isErr={errors?.province}
                                    notication={errors?.province?.message}
                                />
                            </div>
                            <div className="w-[90%] py-2 flex ">
                                <div className="w-1/2 pr-2">
                                    <div className="relative">
                                        <Select
                                            {...register('district')}
                                            className={`bg-[#F3F4F9] p-1 rounded-lg appearance-none border-[1px] border-solid ${
                                                errors?.district ? 'border-red-300' : 'border-[#F3F4F9]'
                                            } `}
                                            placeholder="District"
                                            // onChange={(val) => onChange(val.value)}
                                            options={options}
                                            classNamePrefix="select-known"
                                        />
                                        <div className="w-[30px] h-[30px] absolute top-[50%] -translate-y-1/2 right-2 ">
                                            <img src={'/images/svg/arrow_down.svg'} alt="" />
                                        </div>

                                        {errors?.district && (
                                            <p className="pl-2 mt-2 text-sm text-red-600">
                                                {errors?.province?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <div className="relative">
                                        <Select
                                            {...register('wards')}
                                            className={`bg-[#F3F4F9] p-1 rounded-lg appearance-none outline-none border-[1px] border-solid ${
                                                errors?.wards ? 'border-red-300' : 'border-[#F3F4F9]'
                                            }`}
                                            // inputRef={ref}
                                            placeholder="Wards"
                                            // value={options.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            options={options}
                                            classNamePrefix="select-known"
                                        />
                                        <div className="w-[30px] h-[30px] absolute top-[50%] -translate-y-1/2 right-2 ">
                                            <img src={'/images/svg/arrow_down.svg'} alt="" />
                                        </div>

                                        {errors?.wards && (
                                            <p className="pl-2 mt-2 text-sm text-red-600">{errors?.wards?.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-8 mt-3 pl-4">
                                <div>
                                    <span>Sex :</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        <input
                                            type="radio"
                                            value="Male"
                                            className="w-6 h-6 accent-orange-600 opacity-80 mr-3"
                                            {...register('sex')}
                                        />
                                        <p>Male</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        <input
                                            type="radio"
                                            value="Female"
                                            className="w-6 h-6 accent-orange-600 opacity-80 mr-3"
                                            {...register('sex')}
                                        />
                                        <p>Female</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 my-10 pl-6">
                        <div className=" flex flex-col w-full">
                            <div className=" mb-12 w-full">
                                <h2 className="text-[#333333] font-bold text-2xl">Phone number and email</h2>
                                <div className="w-full">
                                    <div className="w-[90%] py-2">
                                        <InputLabel
                                            placeholder={'Email address'}
                                            type="email"
                                            name="email"
                                            register={register}
                                            isErr={errors?.email}
                                            notication={errors?.email?.message}
                                        />
                                    </div>
                                    <div className="w-[90%] py-2">
                                        <InputLabel
                                            placeholder={'Phone number'}
                                            type="number"
                                            name="phoneNumber"
                                            register={register}
                                            isErr={errors?.phoneNumber}
                                            notication={errors?.phoneNumber?.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full">
                                <div className="w-full grid grid-cols-2">
                                    <h2 className="text-[#333333] font-bold text-2xl">Security</h2>
                                    <div className="flex justify-end item pr-8 w-full ">
                                        <img src="/images/svg/edit.svg" alt="" className="w-7 h-7" />
                                    </div>
                                </div>
                                <div className="w-[90%] py-2">
                                    <InputPassword
                                        register={register}
                                        name="password"
                                        isErr={errors?.password}
                                        notication={errors?.password?.message}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full  my-4 text-lg">
                    <div className="w-full flex justify-end items-center mr-10">
                        <button
                            type=""
                            onClick={(e) => e.preventDefault()}
                            className="bg-white text-[#FF6C00] border-[#FD974B] border rounded-2xl px-20 py-2 opacity-50 mr-10"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#FF6C00] text-white rounded-2xl px-20 py-2 opacity-50 mr-10"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default FormAccount;
