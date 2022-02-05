import React, { useState } from "react";
import Logo from "../../../resources/Logo";
const FrameHeader = (props) => {
  return (
    <div className="py-3 mx-auto border-b-2 backdrop-blur">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div>
          <Logo primary />
        </div>
        <div>
          {props.loading && (
            <span className="COMPONENT__skeleton-box mt-2 h-5 w-32 inline-block rounded-xl"></span>
          )}
          {props.clientData && (
            <div className="rounded text-white px-3 py-1 rounded-xl text-xs bg-theme-primary">
              {props.clientData.title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrameHeader;
