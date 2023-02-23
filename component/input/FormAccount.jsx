import ReactDatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import InputLabel from './InputLabel';
import { useEffect, useState } from 'react';

import InputPassword from './InputPassword';
import { useEditProfileApi } from '@/hook/useAuthApi';
import { toast } from 'react-toastify';

import Select from '../select/Select';

import GoogleMaps from '../maps/GoogleMaps';
import Geocode from '../utils/configGeocode';

const District = ['Quận 1', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Thành Phố Thủ Đức'];
const Wards = ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Cầu Kho', 'Phường Cầu Ông Lãnh'];

const schema = Yup.object().shape({
    username: Yup.string().required('Please enter your user name'),
    address: Yup.string().required('Please enter your address'),
    // district: Yup.string().required('Please enter your district'),
    // wards: Yup.string().required('Please enter your wards'),
    gender: Yup.string(),
    email: Yup.string().required('Please enter your user email'),
    phone: Yup.number().required('Please enter your phone number'),
    password: Yup.string().required('Please enter your user password'),
});
const FormAccount = ({ data }) => {
    const useEditProfileApiMutate = useEditProfileApi(data?.id);
    const [startDate, setStartDate] = useState(new Date());
    const [selectDistrict, setSelectDistrict] = useState('District');
    const [selectWards, setSelectWard] = useState('Wards');
    const [valueLocation, setValueLocation] = useState({
        address: null,
        lat: null,
        lng: null,
    });

    useEffect(() => {
        if (data) {
            setValue('username', data?.username);
            // setStartDate(data?.birthDate);
            setValue('address', data?.address?.address);
            setSelectDistrict(data?.company?.address.city);
            setValue('gender', data?.gender);
            setValue('email', data?.email);
            setValue('phone', data?.phone);
            setValue('password', data?.password);
            setValueLocation({
                lat: data?.address?.coordinates?.lat,
                lng: data?.address?.coordinates?.lng,
            });
        }
    }, [data]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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

    const onSubmitInfo = async (values) => {
        const newValues = [{ ...values, district: selectDistrict, wards: selectWards, address: valueLocation }];
        console.log('values', newValues);
        try {
            await useEditProfileApiMutate.mutate(newValues, {
                onSuccess: (res) => {
                    console.log('res ', res);
                    toast.success('Updated profile successfully');
                },
            });
        } catch (error) {}
    };
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmitInfo)}>
                <div className="grid grid-cols-10">
                    <div className="col-span-10 lg:col-span-6 lg:border-r-2 my-10">
                        <h2 className="text-[#333333] font-bold text-lg lg:text-2xl">User information</h2>
                        <div className="w-full">
                            <div className="w-full lg:w-[90%] py-2">
                                <div>
                                    <InputLabel
                                        placeholder={'Full name'}
                                        type="text"
                                        name="username"
                                        register={register}
                                        isErr={errors?.username}
                                        notication={errors?.username?.message}
                                    />
                                </div>
                            </div>
                            <div className="w-full py-2">
                                <div className="w-full relative">
                                    <ReactDatePicker
                                        className={`bg-[#F3F4F9] w-full lg:w-[90%] p-[10px] rounded-lg`}
                                        placeholderText="Year of Birth"
                                        onChange={(date) => setStartDate(date)}
                                        selected={startDate}
                                        dateFormat="yyyy-dd-MM"
                                    />
                                    <img
                                        src="/images/svg/date.svg"
                                        alt=""
                                        className="absolute right-[5%] lg:right-[13%] top-[10px] w-5 h-5"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2 lg:space-x-8 mt-3 pl-2 lg:pl-4">
                                <div>
                                    <span>Gender :</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        <input
                                            type="radio"
                                            value="male"
                                            name="male"
                                            className="w-6 h-6 accent-orange-600 opacity-80 mr-3"
                                            {...register('gender')}
                                        />
                                        <p>Male</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        <input
                                            type="radio"
                                            value="female"
                                            name="female"
                                            className="w-6 h-6 accent-orange-600 opacity-80 mr-3"
                                            {...register('gender')}
                                        />
                                        <p>Female</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-[90%] py-2">
                                <InputLabel
                                    placeholder={'address'}
                                    type="text"
                                    name="address"
                                    register={register}
                                    isErr={errors?.address}
                                    notication={errors?.address?.message}
                                />
                            </div>

                            {/* Select City */}
                            {/* <div className="w-full lg:w-[90%] py-2 flex ">
                                <div className="w-1/2 pr-2">
                                    <div className="relative">
                                        <div>
                                            <Select
                                                data={District}
                                                selected={selectDistrict}
                                                setSelected={setSelectDistrict}
                                                isPageProfile
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <div className="relative">
                                        <div>
                                            <Select
                                                data={Wards}
                                                selected={selectWards}
                                                setSelected={setSelectWard}
                                                isPageProfile
                                            />
                                        </div>
                                        <div className="w-[30px] h-[30px] absolute top-[50%] -translate-y-1/2 right-2 ">
                                            <img src={'/images/svg/arrow_down.svg'} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Maps */}
                            <div className="w-full lg:w-[90%] py-2">
                                <GoogleMaps
                                    height="400px"
                                    onChange={handleChangeGoogle}
                                    value={
                                        valueLocation.lat && valueLocation.lng
                                            ? { lat: valueLocation.lat, lng: valueLocation.lng }
                                            : {
                                                  lat: data?.address?.coordinates?.lat,
                                                  lng: data?.address?.coordinates?.lng,
                                              }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-10 lg:col-span-4 lg:my-10 lg:pl-6">
                        <div className=" flex flex-col w-full">
                            <div className=" mb-12 w-full">
                                <h2 className="text-[#333333] font-bold text-lg text-2xl">Phone number and email</h2>
                                <div className="w-full">
                                    <div className="w-full lg:w-[90%] py-2">
                                        <InputLabel
                                            placeholder={'Email address'}
                                            type="email"
                                            name="email"
                                            register={register}
                                            isErr={errors?.email}
                                            notication={errors?.email?.message}
                                        />
                                    </div>
                                    <div className="w-full lg:w-[90%] py-2">
                                        <InputLabel
                                            placeholder={'Phone number'}
                                            type="text"
                                            name="phone"
                                            register={register}
                                            isErr={errors?.phone}
                                            notication={errors?.phone?.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full">
                                <div className="w-full grid grid-cols-2">
                                    <h2 className="text-[#333333] font-bold text-lg text-2xl">Security</h2>
                                    <div className="flex justify-end item pr-8 w-full ">
                                        <img src="/images/svg/edit.svg" alt="" className="w-7 h-7" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-[90%] py-2">
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

                <div className="w-full  my-4 text-base lg:text-lg">
                    <div className="w-full  flex  flex-col md:flex-row gap-4 justify-center lg:justify-end items-center lg:mr-10">
                        <button
                            type=""
                            onClick={(e) => e.preventDefault()}
                            className="btn-primary px-10 lg:px-20 py-2 w-full sm:w-[40%] lg:w-[35%]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!errors === null}
                            className={`btn-primary px-10 lg:px-20 py-2 w-full sm:w-[40%] lg:w-[35%]`}
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
