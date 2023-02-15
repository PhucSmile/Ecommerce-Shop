import React from 'react';
import ListPayment from '../listPayment/ListPayment';
const BankAccount = ({ data }) => {
    return (
        <div className="w-full">
            <ListPayment data={data} hiddenShadow />
        </div>
    );
};

export default BankAccount;
