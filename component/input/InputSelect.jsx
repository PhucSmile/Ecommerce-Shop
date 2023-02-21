import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const InputSelect = ({ selected, setSelected, label, errors, listSelect }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} <span className="text-red-700">*</span>
            </label>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#F3F4F9] text-[#67728A] py-[13px] pl-3 pr-10 text-left focus:outline-none  focus-visible:ring-2 sm:text-sm">
                        <span className="block truncate">{selected?.name || 'Lựa chọn'}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <img src="/images/svg/arrow_down.svg" alt="" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute  space-y-2 z-10  mt-1 max-h-[200px] overflow-y-auto no-scrollbar w-full rounded-md bg-white py-2 px-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listSelect.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative shadow-md cursor-default select-none py-2  pl-[5px] ${
                                            active ? 'text-white bg-[#161C24]' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {person.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            {!selected && errors && <p className="mt-2 text-sm text-red-600">This field is required</p>}
        </div>
    );
};

export default InputSelect;
