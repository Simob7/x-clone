import React from "react";
import SearchInput from "./SearchInput";
import Subscribe from "./Subscribe";
import TodayNews from "./TodayNews";
import WhatHappening from "./WhatHappening";
import WhoToFollow from "./WhoToFollow";
import Footer from "./Footer";

function RightBar() {
  return (
    <div className="flex flex-col gap-4 sticky top-0 h-max">
      {/* SEARCH INPUT COMPONENT */}
      <SearchInput />
      {/* SUBSCIBE TO pREMIUM */}
      <Subscribe />
      {/* TODAY`S NEWS */}
      <TodayNews />
      {/* WHAT`S HAPPENING */}
      <WhatHappening /> 
      {/* WHO TO FOLLOW */}
      <WhoToFollow />
      {/* FOOTER  */}
      <Footer />
    </div>
  );
}

export default RightBar;
