import { configureStore } from '@reduxjs/toolkit';
import useSearch from './slice/useSearch';

export const store = configureStore({
    reducer: {
        search: useSearch.reducer,
    },
});
