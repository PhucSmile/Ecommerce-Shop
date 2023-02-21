import { Switch } from '@headlessui/react';
import React from 'react';

const InputSwitch = ({ enabled, setEnabled, title, desc }) => {
    return (
        <>
            <div className="flex justify-between items-center shadow py-5 px-[5px] mb-1">
                <div>
                    <span className="font-medium">{title}</span>
                    {desc && <p className="text-sm text-[#7A7B7A]">{desc}</p>}
                </div>

                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-Orange' : 'bg-[#B5B5B5]'}
    relative inline-flex h-[21px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
      pointer-events-none inline-block h-[16px] w-[15px]  transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>
        </>
    );
};

export default InputSwitch;
