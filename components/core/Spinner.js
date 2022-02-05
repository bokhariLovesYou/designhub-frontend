import React from "react";

const Spinner = (props) => {
  return (
    <>
      <div
        className={`COMPONENT__spinner ${props.button ? `COMPONENT__spinner-button mr-3` : ``} ${
          props.white ? `COMPONENT__spinner-white` : ``
        } ${props.xs ? `COMPONENT__spinner-xs` : ``}`}
      >
        <div className="showbox">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth={`${props.button ? `4` : `2`}`}
                strokeMiterlimit="10"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
