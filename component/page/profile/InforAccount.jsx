import Image from 'next/legacy/image';

export function InforAccount({ data, isMobile = false }) {
    return (
        <>
            <div
                className={`flex flex-col justify-center items-center bg-white rounded-2xl ${
                    !isMobile && 'shadow-xl'
                } `}
            >
                <div className="py-5">
                    <div className="relative w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] ">
                        <Image
                            src={data?.image || '/images/NoUser.png'}
                            layout="fill"
                            objectFit="cover"
                            priority
                            alt="Logo"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className="w-full  font-bold text-center py-4 text-2xl">
                    <h1>{data?.username}</h1>
                </div>
                <div className="w-full flex justify-center item-center font-bold text-center text-xl">
                    <button className="bg-Orange text-base lg:text-xl px-2 py-1 lg:px-4 lg:py-2 text-white font-medium rounded-2xl flex justify-center items-center gap-2">
                        <span>Member Gold</span>
                    </button>
                </div>
                <div className="w-full text-base lg:text-xl text-center py-4 text-xl text-[#7A7B7A]">
                    <span>{data?.address?.city}</span>
                </div>
            </div>
        </>
    );
}
