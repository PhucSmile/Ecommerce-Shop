import React from 'react';
import Select from '../select/Select';

const NavSearchMobile = ({
    stickyScroll = false,
    dataCategories,
    selectedCategories,
    setSelectedCategories,
    dataListSortPrice,
    selectedPrice,
    setSelectedPrice,
    handleFilterSearch = () => {},
    handleReset = () => {},
    handleStopFilter = () => {},
    isMobile = false,
}) => {
    return (
        <>
            {isMobile ? (
                <>
                    {/* mobile */}
                    <div className="block lg:hidden w-full bg-slate-50 shadow-[0px_8px_8px_#656d7826]">
                        <h3 className="font-bold text-lg pl-[10px] py-[10px] bg-[#F3F4F9]">Search Filters</h3>
                        <div className="pt-1 ">
                            {/*search categories */}
                            <Select
                                data={dataCategories}
                                selected={selectedCategories}
                                setSelected={setSelectedCategories}
                            />

                            {/* sort price */}
                            <Select data={dataListSortPrice} selected={selectedPrice} setSelected={setSelectedPrice} />
                            <div className="flex justify-center items-center gap-5 pb-1">
                                <button className="btn-outline text-xs" onClick={handleFilterSearch}>
                                    Search
                                </button>
                                <span className="btn-outline text-xs" onClick={handleReset}>
                                    Reset
                                </span>
                                <button className="btn-outline text-xs" onClick={handleStopFilter}>
                                    Quit Search
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* PC */}
                    <div
                        className={`hidden lg:block max-h-[500px] mb-[316px]  w-full shadow-[0px_8px_8px_#656d7826] ${
                            stickyScroll ? 'sticky__scroll-search' : null
                        }`}
                    >
                        <h3 className="font-bold text-xl pl-[10px] py-[10px] bg-[#F3F4F9]">Search Filters</h3>
                        <div className="px-4 pt-4 ">
                            {/*search categories */}
                            <Select
                                data={dataCategories}
                                title="Categories"
                                selected={selectedCategories}
                                setSelected={setSelectedCategories}
                            />

                            {/* sort price */}
                            <Select
                                data={dataListSortPrice}
                                title="Sort price"
                                selected={selectedPrice}
                                setSelected={setSelectedPrice}
                            />

                            <div className="flex justify-end items-center gap-[16px] mt-5 lg:mb-[150px]">
                                <span className=" cursor-pointer px-1 py-1 hover:font-semibold" onClick={handleReset}>
                                    Reset
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] py-6 gap-5">
                            <button className="btn-outline " onClick={handleStopFilter}>
                                Quit Search
                            </button>
                            <button className="btn-primary " onClick={handleFilterSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NavSearchMobile;
