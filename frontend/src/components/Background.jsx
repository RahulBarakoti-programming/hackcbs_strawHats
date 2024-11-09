import React from "react";
import bg1 from "../assets/bg-1.svg";
import bg2 from "../assets/bg-2.svg";

function Background(props) {
  return (
    <div className="absolute w-full h-full bg-mainBlack">
      <div className="wrapper absolute top-0 left-0 overflow-y-hidden w-full h-full">
        <img src={bg1} width="800px" className="absolute left-0 top-0" />
        <img src={bg2} width="1000px" className="absolute right-0 top-0" />
      </div>
      <div className="wrapper absolute w-full h-full text-white">
        {props.children}
      </div>
    </div>
  );
}

export default Background;
