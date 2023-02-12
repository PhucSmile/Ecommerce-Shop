import React from 'react';

import TableItem from './TableItem';

const Table = ({ data }) => {
    return (
        <>
            <div className="flex justify-between items-center px-4  py-[10px] shadow-checkbox">
                <div className="flex items-center space-x-[8px]">
                    <span className="text-[14px]">All</span>
                </div>

                <span className="text-text cursor-pointer">Actions</span>
            </div>

            <div className="py-4 my-6 shadow-cartItem rounded-lg ">
                {data.length ? (
                    data.map((item) => (
                        <div
                            key={item.id}
                            className=" flex justify-between items-center w-full border-b-[1px] border-solid border-[#ccc]"
                        >
                            <TableItem data={item} />
                        </div>
                    ))
                ) : (
                    <div className="text-center text-xl font-semibold">No items</div>
                )}
            </div>
        </>
    );
};

export default Table;
