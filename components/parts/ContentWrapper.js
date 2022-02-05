import React from "react";

const ContentWrapper = (props) => {
  return (
    <>
      <div className="COMPONENT__ContentWrapper py-7">
        <div className={`container mx-auto px-3 ${props.className}`}>{props.children}</div>
      </div>
    </>
  );
};

export default ContentWrapper;
