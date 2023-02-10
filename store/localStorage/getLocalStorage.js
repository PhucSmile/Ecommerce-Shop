// SEARCH
export const fetchSearchLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('keywordSearch');
        if (result) {
            return JSON.parse(localStorage.getItem('keywordSearch'));
        } else {
            return '';
        }
    }
};

export const fetchHistorySearchLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('historySearch');
        if (result) {
            return JSON.parse(localStorage.getItem('historySearch'));
        } else {
            return [];
        }
    }
};

// CART
export const fetchCartLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('cartItems');
        if (result) {
            return JSON.parse(localStorage.getItem('cartItems'));
        } else {
            return [];
        }
    }
};
export const fetchTotalQuantityLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('totalQuantity');
        if (result) {
            return JSON.parse(localStorage.getItem('totalQuantity'));
        } else {
            return [];
        }
    }
};
export const fetchTotalAmountLocal = () => {
    if (typeof window !== 'undefined') {
        let result = localStorage.getItem('totalAmount');
        if (result) {
            return JSON.parse(localStorage.getItem('totalAmount'));
        } else {
            return [];
        }
    }
};
