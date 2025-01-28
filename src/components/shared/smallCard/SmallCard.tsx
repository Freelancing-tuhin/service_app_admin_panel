import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import React from "react";

const SmallCard = ({ title, count, Icon }: any) => {
  return (
    <a className="flex flex-row items-center p-4 gap-3 w-96 2xl:w-80  transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow-md hover:shadow-xl ">
      <div className="flex items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner ">
        {/* <ShoppingBagIcon className="h-6 w-6 text-green-500" /> */}
        <Icon className="h-6 w-6 text-green-900" />
      </div>
      <div className="f">
        <h5 className=" text-md text-start font-base text-green-800">
          {title}
        </h5>
        <div className="text-2xl font-base text-start">{count}</div>
        {/* <Chip
          variant="gradient"
          className="test-sm md:text-base p-0 font-medium w-32"
          value={count}
        /> */}
      </div>
    </a>
  );
};

export default SmallCard;
