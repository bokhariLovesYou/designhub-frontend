import React from "react";
import { useEditor } from "@craftjs/core";
import { useAppContext } from "@/context/AppWrapper";

const Infobar = (props) => {
  const { query, nodes, canUndo, canRedo, actions } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    nodes: query.getState().nodes,
  }));
  const { handlers } = useAppContext();
  const undoRedoDelay = 50;

  // console.log(`can Undo: `, canUndo);
  // console.log(`can Redo: `, canRedo);
  // console.log(useEditor().query.getState().nodes);
  // console.log(useEditor());

  console.log(useEditor().store.history.pointer);

  return (
    <div className="py-3 bg-white text-theme-text border-b border-theme-border">
      <div className="theme-container mx-auto px-4">
        <div className="theme-row flex items-center -mx-1 justify-between">
          <div className="theme-row flex items-center -mx-1">
            <div className="theme-column px-1">
              <button
                onClick={() => {
                  props.pageSettingsHandler(true);
                  handlers.handleDrawer();
                }}
                type="button"
                className="px-6 flex items-center py-2 rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-xs hover:bg-theme-panel-hover"
              >
                Page Settings
              </button>
            </div>
            <div className="theme-column ml-1">
              <div
                onClick={props.enableResponsiveMode}
                className="cursor-pointer px-3 py-2 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
              >
                {props.enableResponsive ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="pl-1 flex items-center">
              <div className="theme-column ml-1">
                <button
                  type="button"
                  onClick={() => {
                    actions.setOptions((options) => (options.enabled = true));
                    setTimeout(() => {
                      actions.history.undo();
                      actions.clearEvents();
                    }, undoRedoDelay);
                  }}
                  className={` ${
                    !canUndo
                      ? `pointer-events-none cursor-not-allowed opacity-60 hover:bg-gray-400 border-gray-400 hover:bg-theme-panel-dark`
                      : ` hover:bg-theme-panel-hover`
                  } bg-theme-panel-dark border-theme-border cursor-pointer px-3 py-2 w-max rounded border text-theme-text-light text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    viewBox="0 0 512 512"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <g id="layer1">
                      <path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" />
                    </g>
                  </svg>
                </button>
              </div>
              <div className="theme-column ml-1">
                <button
                  onClick={() => {
                    actions.setOptions((options) => (options.enabled = true));
                    setTimeout(() => {
                      actions.history.redo();
                      actions.clearEvents();
                    }, undoRedoDelay);
                  }}
                  className={` ${
                    !canRedo
                      ? `pointer-events-none cursor-not-allowed opacity-60 hover:bg-gray-400 border-gray-400 hover:bg-theme-panel-dark`
                      : ` hover:bg-theme-panel-hover`
                  } bg-theme-panel-dark border-theme-border cursor-pointer px-3 py-2 w-max rounded border text-theme-text-light text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    viewBox="0 0 512 512"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <g id="layer1">
                      <path d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="theme-column px-1">
            <div className="theme-row flex items-center -mx-1">
              <div className="theme-column px-1">
                <a
                  href={`${props.router.asPath}/preview?ref=editor`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    className="px-6 flex items-center py-2 rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-xs hover:bg-theme-panel-hover"
                  >
                    Preview{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infobar;
