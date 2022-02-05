import React, { useState } from "react";
import BlockCard from "@/components/core/BlockCard";
import { HeadingDescriptionCta, HeadingWithContent } from "@/components/blocks";
import { Element, useEditor } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import Spinner from "@/components/core/Spinner";

const Sidebar = ({ renderLayers, handleRenderLayers, loading }) => {
  const { connectors, query } = useEditor();
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { actions, selected } = useEditor((state) => {
    const currentNodeId = [...state.events.selected][0];
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        displayName: state.nodes[currentNodeId].data.displayName,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  const renderBlockPreview = (image) => {
    setShowPreview(true);
    setPreviewImage(image);
  };

  const unsetBlockPreview = () => {
    setShowPreview(false);
    setPreviewImage(false);
  };

  return (
    <>
      {selected && selected.displayName !== "Container" && !renderLayers ? (
        <div className="theme-column text-theme-text w-full max-w-sm bg-white border-r border-theme-border">
          <div className="theme-box bg-white py-4 px-4">
            <div className="theme-box">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li
                    className="cursor-pointer hover:theme-primary"
                    onClick={() => {
                      actions.clearEvents();
                    }}
                  >
                    <span className="text-theme-primary">Home</span>
                  </li>
                  <li>
                    <span
                      style={{ width: "200px" }}
                      className="text-gray-400 truncate cursor-not-allowed"
                    >
                      {selected.displayName}
                    </span>
                  </li>
                </ul>
              </div>
              <h2 className="text-xl font-medium">{selected.displayName}</h2>
            </div>
          </div>
          <div className="theme-box text-theme-text-light border-t border-theme-border">
            <div className="theme-row bg-theme-panel-dark flex flex-items-center">
              <div className="theme-column w-full max-w-100 text-left">
                <div className="theme-box px-4 py-4 border-theme-border border-b cursor-pointer">
                  Content
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ height: "calc(100vh - 57px - 60px - 125px)" }}
            className="theme-box bg-theme-panel overflow-y-scroll pb-52"
          >
            {selected.settings && React.createElement(selected.settings)}
          </div>
        </div>
      ) : (
        <>
          <div className="theme-column text-theme-text w-full max-w-sm bg-white border-r border-theme-border">
            <div className="theme-box flex items-center justify-between bg-white py-4 px-4">
              <div className="theme-box">
                <h2 className="text-xl font-medium">Edit page</h2>
              </div>
            </div>
            <div
              className={`theme-box text-theme-text-light border-t border-theme-border ${
                loading ? `pointer-events-none` : ``
              }`}
            >
              <div className="theme-row bg-theme-panel-dark flex flex-items-center">
                <div
                  className={`theme-column w-full max-w-1/2 ${
                    !renderLayers && `bg-theme-panel`
                  } text-center`}
                >
                  <div
                    onClick={() => {
                      handleRenderLayers(), actions.clearEvents();
                    }}
                    className="theme-box px-4 py-4 border-r border-theme-border font-normal border-b cursor-pointer"
                  >
                    Add
                  </div>
                </div>
                <div
                  className={`theme-column w-full max-w-1/2 ${
                    renderLayers && `bg-theme-panel`
                  } text-center`}
                >
                  <div
                    onClick={() => {
                      handleRenderLayers(), actions.clearEvents();
                    }}
                    className="theme-box px-4 py-4 border-theme-border border-b cursor-pointer"
                  >
                    Contents
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <div
                style={{ height: "calc(100vh - 57px - 60px - 125px)" }}
                className={`theme-box ${
                  !renderLayers && `px-4 py-2`
                } bg-theme-panel overflow-y-scroll pb-24`}
              >
                <div
                  className="flex justify-center items-center flex-col"
                  style={{ height: "200px" }}
                >
                  <Spinner />
                </div>
              </div>
            ) : (
              <div
                style={{ height: "calc(100vh - 57px - 60px - 125px)" }}
                className={`theme-box ${
                  !renderLayers && `px-4 py-2`
                } bg-theme-panel overflow-y-scroll pb-24`}
              >
                {renderLayers ? (
                  <Layers expandRootOnLoad={true} />
                ) : (
                  <>
                    {showPreview && (
                      <div
                        className="previewer h-40 w-full shadow-xl rounded-lg shadow-outline border-theme-border border-2 fixed"
                        style={{ zIndex: "9", left: "0", maxWidth: "383px", top: "125px" }}
                      >
                        <div className="COMPONENT__image-preview h-full border-theme-border rounded border-2 w-full">
                          <div className="flex h-full justify-center items-center flex-col">
                            <img
                              className="max-w-full max-h-full"
                              src={previewImage}
                              alt="Block Preview"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="theme-box text-theme-text-light py-4">
                      <h2 className="font-medium">Hero Blocks</h2>
                    </div>
                    <div className="theme-row flex flex-wrap -mx-1">
                      {Array.from(Array(5).keys()).map((elem, index) => (
                        <BlockCard
                          connectors={connectors}
                          component={<HeadingDescriptionCta />}
                          key={index}
                          title={HeadingDescriptionCta.craft?.displayName}
                          previewImage={HeadingDescriptionCta.craft?.preview}
                          renderBlockPreview={renderBlockPreview}
                          unsetBlockPreview={unsetBlockPreview}
                        />
                      ))}
                    </div>
                    <div className="theme-box text-theme-text-light py-4">
                      <h2 className="font-medium">Feature Blocks</h2>
                    </div>
                    <div className="theme-row flex flex-wrap -mx-1">
                      {Array.from(Array(3).keys()).map((elem, index) => (
                        <BlockCard
                          connectors={connectors}
                          component={<HeadingWithContent />}
                          title={`Heading With Content`}
                          previewImage={HeadingWithContent.craft?.preview}
                          renderBlockPreview={renderBlockPreview}
                          unsetBlockPreview={unsetBlockPreview}
                          key={index}
                        />
                      ))}
                    </div>
                    <div className="theme-box text-theme-text-light py-4">
                      <h2 className="font-medium">Content Blocks</h2>
                    </div>
                    <div className="theme-row flex flex-wrap -mx-1">
                      {Array.from(Array(4).keys()).map((elem, index) => (
                        <BlockCard
                          connectors={connectors}
                          component={<HeadingDescriptionCta />}
                          previewImage={HeadingDescriptionCta.craft?.preview}
                          renderBlockPreview={renderBlockPreview}
                          title={`Heading Description CTA`}
                          unsetBlockPreview={unsetBlockPreview}
                          key={index}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
