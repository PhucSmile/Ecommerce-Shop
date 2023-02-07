import { useEffect, useRef, useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { IconSearch } from '@/assets/svg';
import { userActionSearch } from '@/store/slice/useSearch';
import { useAllCategoriesApi } from '@/hook/useCategoryApi';

const InputSearch = ({
    selectedSearch,
    setSelectedSearch,
    querySearch,
    setQuerySearch,
    debounce,
    onSubmit,
    handleKeypress,
}) => {
    const { data: dataCategories } = useAllCategoriesApi();
    const [dataHistory, setDataHistory] = useState();
    const focusRef = useRef();
    const renderHistorySearch = useSelector((state) => state.search.historySearch);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('historySearch'));
        setDataHistory(data?.slice(0, 8));
    }, [renderHistorySearch]);

    const handleClose = () => {
        setQuerySearch('');
        focusRef.current.focus();
    };

    const filteredPeople =
        querySearch === ''
            ? dataHistory
            : dataHistory?.filter((item) =>
                  item.q.toLowerCase().replace(/\s+/g, '').includes(querySearch.toLowerCase().replace(/\s+/g, '')),
              );

    return (
        <div>
            <Combobox value={selectedSearch} onChange={setSelectedSearch}>
                <div className="relative mt-1">
                    <div className=" flex justify-between items-center  border-[1px] border-solid border-primary rounded-2xl overflow-hidden h-[48px]">
                        <div className="flex items-center pl-1 md:pl-[19px] pr-2 pointer-events-none">
                            <IconSearch className="hidden md:block w-6 h-6 text-primary dark:text-gray-400" />
                        </div>
                        <div className="relative">
                            <Combobox.Input
                                type="text"
                                id="default-search"
                                className="block flex-1 focus:outline-none  lg:min-w-[350px] w-full focus-visible:none h-[60%] border-r-[1px] border-solid border-[#DADADA] pr-6 text-sm lg:text-md"
                                placeholder="Search products..."
                                // required
                                value={querySearch}
                                ref={focusRef}
                                onChange={(event) => setQuerySearch(event.target.value)}
                                onKeyUp={handleKeypress}
                            />
                            {!!querySearch && (
                                <span
                                    className="absolute right-1 md:right-0 top-[50%] translate-y-[-50%] cursor-pointer"
                                    onClick={handleClose}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 "
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            )}
                        </div>

                        <Combobox.Button
                            type="submit"
                            className="mx-4 bg-[#F6F6F6] px-[11px] py-[10px] rounded-2xl  sm:block"
                            onClick={onSubmit}
                        >
                            <img src="/images/header/search.svg" alt="" />
                        </Combobox.Button>
                    </div>

                    {/*  render */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuerySearch('')}
                    >
                        <Combobox.Options className="z-10 absolute mt-3 right-0  left-0 w-full   overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <div className=" py-[16px] bg-[#f6f6f633]">
                                <div className="px-4 ">
                                    <h4 className="text-base text-[#3A3A3A] font-bold">
                                        Popular result (chưa xử lý sự kiện)
                                    </h4>

                                    <div className=" w-full mt-2 mb-[34px] flex items-center gap-2 flex-wrap ">
                                        {dataCategories?.data.slice(0, 6).map((item, index) => (
                                            <span key={index} className="tags-popular ">
                                                #{item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-base text-[#3A3A3A] font-bold px-4">Search history</h4>
                                    <div className="mt-[10px]">
                                        {' '}
                                        {filteredPeople?.length === 0 && querySearch !== '' ? (
                                            <div className="relative cursor-default select-none py-2 px-4 ">
                                                Nothing found.
                                            </div>
                                        ) : (
                                            <>
                                                {filteredPeople?.map((person, index) => (
                                                    <Combobox.Option
                                                        key={index}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none pl-4 lg:mr-4 py-2 hover:bg-[#F3F4F9] pr-4 ${
                                                                active ? 'bg-[#F3F4F9] ' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={person.q}
                                                    >
                                                        {({ selectedSearch, active }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${
                                                                        selectedSearch ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                                    onClick={async () => {
                                                                        await dispatch(
                                                                            userActionSearch.saveSearch({
                                                                                q: person.q,
                                                                            }),
                                                                        );
                                                                        router.push(
                                                                            {
                                                                                pathname: '/search',
                                                                                query: {
                                                                                    q: person.q,
                                                                                },
                                                                            },
                                                                            undefined,
                                                                            { shallow: true },
                                                                        );
                                                                    }}
                                                                >
                                                                    {person.q}
                                                                </span>
                                                                {selectedSearch ? (
                                                                    <span
                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                            active ? 'text-white' : 'text-teal-600'
                                                                        }`}
                                                                    ></span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default InputSearch;
