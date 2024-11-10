import React from "react";
import Background from "./Background";
import Header from "./Header";
import DataForm from "./Submit";

function DataSubmission() {
  return (
    <>
      <Background>
        <Header></Header>
        <div className="mt-11 w-full h-4/5 flex justify-center items-center">
          <DataForm></DataForm>
        </div>
      </Background>
    </>
  );
}

export default DataSubmission;
