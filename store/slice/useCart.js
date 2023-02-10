import { createSlice } from '@reduxjs/toolkit';
import { fetchCartLocal, fetchTotalAmountLocal, fetchTotalQuantityLocal } from '../localStorage/getLocalStorage';
import { setCartInLocal, setTotalAmountInLocal, setTotalQuantityInLocal } from '../localStorage/setLocalStorage';

// cartItems
// totalQuantity
// totalAmount

const initialState = {
    cartItems: fetchCartLocal(),
    totalQuantity: fetchTotalQuantityLocal(),
    totalAmount: fetchTotalAmountLocal(),
};

export const useCart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ++++ADD CART++++
        addToCart(state, action) {
            const newItems = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItems.id);
            state.totalQuantity++;

            if (!existingItem) {
                // add to cart
                state.cartItems.push({
                    id: newItems.id,
                    title: newItems.title,
                    image: newItems.image,
                    price: newItems.price,
                    quantity: 1,
                    totalPrice: newItems.price,
                });
            } else {
                // increase quantity
                existingItem.quantity++;

                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItems.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );
            setCartInLocal(state.cartItems);
            setTotalQuantityInLocal(state.totalQuantity);
            setTotalAmountInLocal(state.totalAmount);
        },

        // ++++REMOVE++++
        removeCart(state, action) {
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );
            setCartInLocal(state.cartItems);
            setTotalQuantityInLocal(state.totalQuantity);
            setTotalAmountInLocal(state.totalAmount);
        },

        // ++++DELETE++++
        deleteCart(state, action) {
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0,
            );
            setCartInLocal(state.cartItems);
            setTotalQuantityInLocal(state.totalQuantity);
            setTotalAmountInLocal(state.totalAmount);
        },
    },
});

// Action creators are generated for each case reducer function

export const { addToCart, removeCart, deleteCart } = useCart.actions;
export const getAllCarts = (state) => state.cart.cartItems;
export const getTotalQuantity = (state) => state.cart.totalQuantity;
export const getTotalAmount = (state) => state.cart.totalAmount;
export default useCart;
