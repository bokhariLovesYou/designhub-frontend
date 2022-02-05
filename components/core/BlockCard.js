import React from "react";

const BlockCard = ({
  connectors,
  component,
  title,
  icon,
  renderBlockPreview,
  previewImage,
  unsetBlockPreview,
}) => {
  return (
    <>
      {component && (
        <div
          onMouseEnter={() => {
            renderBlockPreview(previewImage);
          }}
          onMouseLeave={unsetBlockPreview}
          ref={(ref) => connectors.create(ref, component)}
          className="theme-column mb-4 px-1 w-full max-w-1/3"
        >
          <div className="theme-box h-full text-center text-theme-text-light  bg-white border border-theme-border px-2 py-2 cursor-grab rounded flex flex-col justify-between">
            <div className="theme-box dots mb-2">
              <span className="block">······</span>
              <span className="block">······</span>
            </div>
            <div className="theme-box flex justify-center" style={{ color: "#7c98b6" }}>
              {icon ? (
                icon
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              )}
            </div>
            <div className="theme-box leading-none mt-2 mx-auto">
              <span className="text-xs">
                {title && title.length > 20 ? title.substring(0, 20) + `...` : title}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockCard;
