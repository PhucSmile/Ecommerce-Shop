import { useRouter } from "next/router";
import React from "react";
import clsx from "clsx";

const Goback = ({ title, className }) => {
  const router = useRouter();
  return (
    <div
      className={clsx("flex items-center gap-7 py-[5px] mb-[14px]", className)}
    >
      <button
        className="cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <img src="/images/svg/arrow_back.svg" alt="" />
      </button>
      <h4 className="text-2xl font-bold">{title}</h4>
    </div>
  );
};

export default Goback;
