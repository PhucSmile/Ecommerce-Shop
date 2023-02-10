import { configureStore } from '@reduxjs/toolkit';
import useSearch from './slice/useSearch';
import useCart from './slice/useCart';

export const store = configureStore({
    reducer: {
        search: useSearch.reducer,
        cart: useCart.reducer,
    },
});
