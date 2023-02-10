import { createSlice } from '@reduxjs/toolkit';
import { setHistorySearch, setSearch } from '../localStorage/setLocalStorage';
import { fetchHistorySearchLocal, fetchSearchLocal } from '../localStorage/getLocalStorage';

const initialState = {
    search: fetchSearchLocal(),
    historySearch: fetchHistorySearchLocal(),
};

export const useSearch = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // save results search
        saveSearch(state, action) {
            state.search = action.payload;
            setSearch(state.search);
        },
        // save history search
        addHistorySearch(state, action) {
            const newItems = action.payload;
            const existingItem = state.historySearch.find((item) => item.id === newItems.id);
            if (!existingItem && newItems.q !== '') {
                state.historySearch.push({
                    id: newItems.id,
                    q: newItems.q,
                });
            }
            setHistorySearch(state.historySearch);
        },
    },
});

// Action creators are generated for each case reducer function

export const { saveSearch, addHistorySearch } = useSearch.actions;
export const getAllSearch = (state) => state.search.search;
export const getHistorySearch = (state) => state.search.historySearch;
export default useSearch;
