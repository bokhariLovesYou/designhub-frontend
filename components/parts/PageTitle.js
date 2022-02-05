import React from "react";
import Link from "next/link";

const PageTitle = (props) => {
  return (
    <>
      <div
        className={`COMPONENT__page-title py-6 border-theme-border border-b-2 ${props.className}`}
      >
        {props.renderActionButton ? (
          <div className="container mx-auto px-3 text-theme-text">
            <div className="flex justify-between items-center">
              <div className="column">
                {props.title === "Loading" ? (
                  <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 block rounded"></span>
                ) : (
                  <h1 className="text-2xl font-medium">{props.title}</h1>
                )}
                {props.clientTitle && props.clientTitle === "Loading" ? (
                  <span className="COMPONENT__skeleton-box mt-2 h-5 w-24 inline-block rounded"></span>
                ) : (
                  <>
                    {props.clientRoute ? (
                      <Link href={props.clientRoute}>
                        <span className="hover:underline cursor-pointer">{props.clientTitle}</span>
                      </Link>
                    ) : (
                      <span>{props.clientTitle}</span>
                    )}
                  </>
                )}
              </div>
              {props.renderOptionsButton ? (
                <>
                  <div className="flex justify-between items-center -m-2">
                    <div className="column px-2">
                      <button
                        onClick={props.optionsOnClick}
                        type="button"
                        className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
                      >
                        Options
                      </button>
                    </div>
                    <div className="column px-2">
                      <button
                        onClick={props.actionsOnClick}
                        type="button"
                        className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
                      >
                        Add New
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="column">
                  <button
                    onClick={props.actionsOnClick}
                    type="button"
                    className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
                  >
                    Add New
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-3 text-theme-text">
            {props.title === "Loading" ? (
              <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded"></span>
            ) : (
              <h1 className="text-2xl font-medium">{props.title}</h1>
            )}
            {props.clientTitle && props.clientTitle === "Loading" ? (
              <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded"></span>
            ) : (
              <span>{props.clientTitle}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PageTitle;
