import { IconExclamation } from '@/assets/svg';

export default function InputLabel({ placeholder, label, defaultValue, type, name, register, isErr, notication }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className=" relative rounded-md">
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={defaultValue}
                    {...register(`${name}`)}
                    className={`block bg-[#F3F4F9] w-full pl-[10px] pr-10 py-[11px] border focus:outline-none  sm:text-sm rounded-md ${
                        isErr ? 'border-red-300' : 'border-[#F3F4F9]'
                    }`}
                    placeholder={placeholder}
                />
                {isErr && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500">
                        <IconExclamation />
                    </div>
                )}
            </div>
            {isErr && <p className="pl-2 mt-2 text-sm text-red-600">{notication}</p>}
        </div>
    );
}
