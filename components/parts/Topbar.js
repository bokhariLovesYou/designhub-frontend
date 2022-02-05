import React from "react";
import Button from "@/components/core/Button";

const Topbar = (props) => {
  const pageData = props.pageData ? props.pageData : null;
  return (
    <div className="py-4 bg-theme-dark text-theme-text-inverted">
      <div className="theme-container mx-auto px-4">
        <div className="theme-row flex items-center -mx-1 justify-between">
          <div className="theme-column px-1 w-full max-w-3/4 flex justify-start items-center">
            <div className="theme-row flex items-center -mx-1">
              <div className="theme-column px-1">
                {props.pageData ? (
                  <a href={`/clients/${props.clientId}/bp/${pageData.blueprint.data.id}`}>
                    <Button variant="dark" className="text-xs">
                      Back
                    </Button>
                  </a>
                ) : (
                  <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
                )}
              </div>
              <div className="theme-column px-1">
                {props.pageData ? (
                  <>
                    <div className="flex">
                      <Button
                        onClick={() => props.updatePageDraft()}
                        loading={props.updatePage.isLoading}
                        variant="dark"
                        className="text-xs"
                        xs={true}
                      >
                        Save
                      </Button>
                      {props.updatePage.isLoading ? (
                        <div className="pl-3 flex items-center">
                          <span className="text-white text-sm">Saving...</span>
                        </div>
                      ) : (
                        <div className="pl-3 flex items-center">
                          {props.canSave ? (
                            <span className="text-white text-sm">Unsaved Changes</span>
                          ) : (
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-white text-sm flex pl-1">Saved</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
                )}
              </div>
            </div>
          </div>

          <div className="theme-column px-1 w-full flex justify-center items-center">
            <div className="theme-box">
              {props.pageData ? (
                <h1 className="text-2xl font-medium truncate max-w-xs">{pageData.draftTitle}</h1>
              ) : (
                <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-44 inline-block rounded "></span>
              )}
            </div>
          </div>

          <div className="theme-column px-1 w-full max-w-3/4 flex justify-end items-center">
            <div className="theme-box">
              {props.pageData ? (
                <Button variant="primary" className="text-xs">
                  Publish
                </Button>
              ) : (
                <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
