import React from "react";
import { useEditor } from "@craftjs/core";

const History = () => {
  const { nodes, canUndo, canRedo, actions } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    nodes: query.getState().nodes,
  }));
  console.log("History");
  return (
    <>
      <div className="pl-1 flex items-center">
        <div className="theme-column ml-1">
          <button
            type="button"
            onClick={() => {
              actions.history.undo();
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
              actions.history.redo();
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
    </>
  );
};

export default History;
