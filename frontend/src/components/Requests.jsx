import React from "react";
import Background from "./Background";
import DataCard from "./DataCard";
import Header from "./Header";
const data = [
  { name: "Item 1", description: "Description for item 1..." },
  { name: "Item 2", description: "Description for item 2..." },
  { name: "Item 3", description: "Description for item 3..." },
  { name: "Item 1", description: "Description for item 1..." },
  { name: "Item 2", description: "Description for item 2..." },
  { name: "Item 3", description: "Description for item 3..." },
];

function Requests() {
  return (
    <>
      <Background>
        <Header></Header>
        <div className="w-full h-full mt-24  flex flex-wrap gap-4 p-5">
          {data.map((item, index) => (
            <DataCard
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      </Background>
    </>
  );
}

export default Requests;
