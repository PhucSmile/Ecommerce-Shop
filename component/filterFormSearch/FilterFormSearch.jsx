import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/router';
import InputSearch from '../input/InputSearch';
import useDebounce from '@/hook/useDebounce/UseDebounce';

import { addHistorySearch, saveSearch } from '@/store/slice/useSearch';
import { useDispatch } from 'react-redux';

export default function FilterFromSearch() {
    const [selectedSearch, setSelectedSearch] = useState();
    const [querySearch, setQuerySearch] = useState('');
    const debounce = useDebounce(querySearch, 500);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = () => {
        setOpen(true);
    };

    // submit search
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                // save results for search
                await dispatch(saveSearch(querySearch));
                // save results render history search
                await dispatch(
                    addHistorySearch({
                        id: Math.floor(Math.random() * 100) + 1,
                        q: querySearch,
                    }),
                );
                router.push(
                    {
                        pathname: '/products/search',
                        query: {
                            q: querySearch,
                        },
                    },
                    undefined,
                    { shallow: true },
                );
            } catch (error) {}
        },
        [querySearch],
    );

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    return (
        <>
            <form>
                <InputSearch
                    selectedSearch={selectedSearch}
                    setSelectedSearch={setSelectedSearch}
                    querySearch={querySearch}
                    setQuerySearch={setQuerySearch}
                    debounce={debounce}
                    onSubmit={handleSubmit}
                    handleKeypress={handleKeypress}
                />
            </form>
        </>
    );
}
