// SEARCH
export const setSearch = (data) => {
    localStorage.setItem('keywordSearch', JSON.stringify(data));
};

export const setHistorySearch = (data) => {
    localStorage.setItem('historySearch', JSON.stringify(data));
};

// CART
export const setCartInLocal = (data) => {
    localStorage.setItem('cartItems', JSON.stringify(data));
};

export const setTotalQuantityInLocal = (data) => {
    localStorage.setItem('totalQuantity', JSON.stringify(data));
};

export const setTotalAmountInLocal = (data) => {
    localStorage.setItem('totalAmount', JSON.stringify(data));
};
