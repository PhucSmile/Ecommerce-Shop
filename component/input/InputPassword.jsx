import React, { useState } from 'react';

const InputPassword = ({
    register,
    defaultValue,
    placeholder = 'Password',
    errors,
    label,
    name,
    notication,
    isErr,
}) => {
    const [open, setOpen] = useState(false);

    // handle toggle
    const toggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className=" relative ">
                <div className="w-full mb-4">
                    <input
                        id={name}
                        name={name}
                        value={defaultValue}
                        placeholder={placeholder}
                        type={open === false ? 'password' : 'text'}
                        className={`block bg-[#F3F4F9] w-full pl-[10px] pr-10 py-[11px] border focus:outline-none  sm:text-sm rounded-md ${
                            isErr ? 'border-red-300' : 'border-[#F3F4F9]'
                        }`}
                        {...register(`${name}`)}
                    />
                    {isErr && <p className="pl-2 mt-2 text-sm text-red-600">{notication}</p>}
                </div>

                <div className="text-2xl absolute top-[10px] right-[12px]">
                    {open === false ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            onClick={toggle}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            onClick={toggle}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </>
    );
};

export default InputPassword;
