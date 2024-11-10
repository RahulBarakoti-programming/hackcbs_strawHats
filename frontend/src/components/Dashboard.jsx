import React, { useEffect, useState } from "react";
import Background from "./Background";
import Header from "./Header";
import searchIcon from "../assets/searchIcon.svg";
import DataCard from "./DataCard";
import Requests from "./Requests";
import DataSubmission from "./DataSubmission";
import { getAllData } from "@/web3functions/ContractIntract";
const data = [
  { name: "Item 1", description: "Description for item 1..." },
  { name: "Item 2", description: "Description for item 2..." },
  { name: "Item 3", description: "Description for item 3..." },
  { name: "Item 1", description: "Description for item 1..." },
  { name: "Item 2", description: "Description for item 2..." },
  { name: "Item 3", description: "Description for item 3..." },

  // Add more items as needed
];

function Dashboard() {
  const [changeTo, setChangeTo] = useState("home");
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <Background>
        <Header setChangeTo={setChangeTo}></Header>
        {changeTo == "upload" && <DataSubmission></DataSubmission>}
        {changeTo == "home" && (
          <>
            <div className=" w-full flex justify-center flex-col items-center h-3/4">
              <h1 className="text-4xl font-bold">Project Luffy</h1>
              <h3 className="text-1xl mb-12 ">
                Your Identity, Your Terms, Your Power.
              </h3>
              <div class=" w-1/2 flex items-center bg-[#1E1E2A] border border-[#627D98] rounded-full px-4 py-5 ">
                <img src={searchIcon} alt="Search Icon" class="w-7 h-7 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  class="bg-transparent border-none text-[#A0AEC0] placeholder-[#A0AEC0] focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="w-full h-full mt-24 bg-mainBlack flex flex-wrap gap-4 p-5">
              {data.map((item, index) => (
                <DataCard
                  key={index}
                  name={item.name}
                  description={item.description}
                />
              ))}
            </div>
          </>
        )}
        {changeTo == "requests" && <Requests></Requests>}
      </Background>
    </>
  );
}

export default Dashboard;
