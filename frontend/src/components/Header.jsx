import React from "react";
import upload from "../assets/upload.svg";
import profile from "../assets/profile.svg";

function Header({ setChangeTo }) {
  return (
    <>
      <header className="flex justify-between items-center bg-samBlack p-4 text-white">
        <div className="text-lg font-bold">PROJECT LUFFY</div>
        <div className="flex gap-7">
          <span className="cursor-pointer" onClick={() => setChangeTo("home")}>
            Home
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setChangeTo("upload")}
          >
            Upload Data
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setChangeTo("myData")}
          >
            My Data
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setChangeTo("purchased")}
          >
            Purchased Data
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
