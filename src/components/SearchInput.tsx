import React from "react";
import CustumImage from "./Image";

function SearchInput() {
  return (
    <div className="mt-4 px-2 flex items-center rounded-full border-borderGray border-[1px] justify-center relative ">
      <CustumImage src="icons/explore.svg" width={16} height={16} />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
        className="bg-transparent  px-2 py-2   w-full   outline-none text-sm"
      />
    </div>
  );
}

export default SearchInput;
