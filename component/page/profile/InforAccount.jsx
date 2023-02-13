import Image from 'next/image';

export function InforAccount({ data }) {
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-xl">
                <div className="py-5">
                    <div className="relative w-[200px] h-[200px] ">
                        <Image
                            src={data?.image || '/images/NoUser.png'}
                            layout="fill"
                            objectFit="cover"
                            alt="Logo"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className="w-full font-bold text-center py-4 text-2xl">
                    <h1>{data?.username}</h1>
                </div>
                <div className="w-full flex justify-center item-center font-bold text-center text-xl">
                    <button className="bg-Orange px-4 py-2 text-white font-medium rounded-2xl flex justify-center items-center gap-2">
                        <span>Member Gold</span>
                    </button>
                </div>
                <div className="w-full text-center py-4 text-xl text-[#7A7B7A]">
                    <span>{data?.address?.city}</span>
                </div>
            </div>
        </>
    );
}
