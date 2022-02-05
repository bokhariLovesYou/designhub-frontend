import React from "react";
import Logo from "../../resources/Logo";
import Link from "next/link";

const DashboardHeader = (props) => {
  return (
    <>
      <div className="COMPONENT__header py-3 text-white bg-theme-dark">
        <div className={`container mx-auto px-3 ${props.logoCentered && `flex justify-center`}`}>
          <div className="cursor-pointer">
            <Link href="/clients">
              <div>
                <Logo />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
