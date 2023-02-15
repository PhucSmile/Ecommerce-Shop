import React, { useCallback, useState } from 'react';

const PayMethods = [
    {
        image: '/images/pay/payLists.png',
        voucher: true,
        name: 'Payoo',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'Momo',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'ZaloPay',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'VNPay',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'Add Credit/Debit card',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'Add Visa/ Master/ JCB',
    },
    {
        image: '/images/pay/payLists.png',
        voucher: false,
        name: 'Bank account',
    },
];

const Payment = ({ hiddenEdit = false, setIsOpenModal1, setAddPayment, setIsOpenModal2 }) => {
    const [checkValue, setCheckValue] = useState(null);

    const OpenModalAddPayment = useCallback((name) => {
        setIsOpenModal1(false);
        setCheckValue(name);
        setIsOpenModal2(true);

        if (name !== 'Tài khoản ngân hàng') {
            setAddPayment(false);
        } else {
            //   console.log("Thêm tài khoản ngân hàng");
            setAddPayment(true);
        }
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h5 className={`text-xl font-semibold ${hiddenEdit ? 'my-6' : ' my-2'} `}>Payment methods</h5>
                {hiddenEdit && <span className="font-semibold text-orange cursor-pointer">Setting</span>}
            </div>

            {PayMethods.map((item, index) => (
                <div
                    key={index}
                    onClick={() => OpenModalAddPayment(item.name)}
                    className={` flex justify-between items-center rounded-2xl border-[1px] border-solid ${
                        checkValue === item.name ? 'border-orange' : 'border-[#CACACA]'
                    }  hover:border-orange p-4 my-[13px] cursor-pointer`}
                >
                    <form className="flex items-center space-x-[16px]">
                        <input
                            id="yellow-radio"
                            type="radio"
                            value={item.name}
                            checked={item.name === checkValue}
                            name="radio-pay"
                            className="w-4 h-4 text-orange bg-gray-100 border-gray-300 accent-orange"
                            onChange={(e) => setCheckValue(e.target.value)}
                        />

                        <img src={item.image} alt="image-Pay" />
                        <span className="font-medium">{item.name}</span>
                    </form>
                    <div className="flex items-center space-x-[9px]">
                        {item.voucher && (
                            <>
                                <img src="/images/pay/icon-voucher.svg" />
                                <span className="text-xs font-semibold">-10%</span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Payment;
