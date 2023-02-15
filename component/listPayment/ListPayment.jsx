import React, { useState } from 'react';
import BankCart from '../bankCart/BankCart';
import ModalPaymentMethods from '../modal/ModalPaymentMethods';
import ModalAddPayment from '../modal/ModalAddPayment';

const ListPayment = ({ data, hiddenShadow = false }) => {
    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [addPayment, setAddPayment] = useState(false);
    const [defaultBtn, setDefaultBtn] = useState(false);

    const HandleAddPayment = () => {
        setIsOpenModal1(true);
    };

    const handleDefaul = () => {
        setDefaultBtn(!defaultBtn);
    };

    const handleDelete = () => {
        console.log('delête');
    };
    console.log('data', data);
    return (
        <>
            <div
                className={`flex flex-col gap-6 ${
                    !hiddenShadow && 'shadow-paymentSetting'
                }  rounded-3xl max-w-[888px] mx-auto w-full  mb-[120px] p-6`}
            >
                <button className="btn-add-payment" onClick={HandleAddPayment}>
                    Add payment card <span>+</span>
                </button>

                <BankCart onDelete={handleDelete} onDefaul={handleDefaul} data={data} defaultBtn={defaultBtn} />
            </div>
            {/* Modal */}
            {isOpenModal1 && (
                <ModalPaymentMethods
                    isOpenModal1={isOpenModal1}
                    setIsOpenModal1={setIsOpenModal1}
                    setIsOpenModal2={setIsOpenModal2}
                    setAddPayment={setAddPayment}
                />
            )}
            {/* Modal2 */}
            {isOpenModal2 && (
                <ModalAddPayment
                    isOpenModal2={isOpenModal2}
                    setIsOpenModal2={setIsOpenModal2}
                    addPayment={addPayment}
                />
            )}
        </>
    );
};

export default ListPayment;
