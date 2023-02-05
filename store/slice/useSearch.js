import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: [],
    historySearch: [],
    categoryTad: {},
};

export const useSearch = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // save results search
        saveSearch(state, action) {
            state.search = action.payload;
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
            localStorage.setItem('historySearch', JSON.stringify(state.historySearch));
        },
    },
});

// Action creators are generated for each case reducer function

export const userActionSearch = useSearch.actions;

export default useSearch;
