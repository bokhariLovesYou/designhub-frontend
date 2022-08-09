import React from "react";

const FrameFooter = (props) => {
  return (
    <div className={`${props.className} bg-gray-900`}>
      <div className="px-4 flex items-center flex-col justify-between py-3">
        <p className="text-xs text-gray-300 mb-0">
          © Copyright {new Date().getFullYear()} OneIMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FrameFooter;
