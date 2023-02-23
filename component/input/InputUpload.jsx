import Image from "next/legacy/image";
import React from 'react';

const InputUpload = ({ fileList, setFileList, name, register }) => {
    // upload file image
    const handleFileChange = (e) => {
        const selectedFIles = [];
        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file));
        });
        setFileList(selectedFIles);
    };
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                File (photo)
            </label>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-[88px] h-[88px]">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                className="w-7 h-7 my-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                                <span className="font-semibold ">Click to upload</span>
                            </p>
                        </div>

                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            {...register(`${name}`)}
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {/* render image */}
                {fileList &&
                    fileList.map((url, index) => {
                        return (
                            <div key={index} className="relative w-[88px] h-[88px] ">
                                <Image src={url} layout="fill" objectFit="cover" alt="image" />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default InputUpload;
