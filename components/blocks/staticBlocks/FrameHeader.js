import React, { useState } from "react";
import Logo from "../../../resources/Logo";
import Link from "next/link";
const FrameHeader = (props) => {
  return (
    <div className={`${props.className} py-3 mx-auto border-b-2 backdrop-blur`}>
      {props.sidebarEnabled && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://tailwindcss.com/_next/static/media/docs@30.beeb08605f12f699c5abc3814763b65e.avif"
            alt=""
          />
        </div>
      )}
      <div className="BS__container px-4 mx-auto flex justify-between items-center">
        <div className={`${props.hideLogoOnLarge ? `lg:opacity-0` : ``}`}>
          {props.logoDestination ? (
            <Link href={props.logoDestination}>
              <div className="cursor-pointer relative z-1">
                <Logo primary />
              </div>
            </Link>
          ) : (
            <Logo primary />
          )}
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
