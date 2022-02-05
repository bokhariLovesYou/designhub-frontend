import React from "react";
import { useAppContext } from "@/context/AppWrapper";
import { useEditor } from "@craftjs/core";

const ImageGallery = () => {
  const { globalState, handlers } = useAppContext();
  const { connectors, query } = useEditor();
  const { actions, selected } = useEditor((state) => {
    const currentNodeId = [...state.events.selected][0];
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        displayName: state.nodes[currentNodeId].data.displayName,
        name: state.nodes[currentNodeId].data.name,
        props: state.nodes[currentNodeId].data.props,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  const selectImage = (url, alt) => {
    actions.setProp(selected.id, (props) => {
      props[globalState.imageGalleryFieldSelected] = { url, alt };
    });
    handlers.handleDrawer();
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="font-medium text-theme-text">Recent Images</h2>
      </div>
      <div className="flex flex-wrap -mx-2">
        {Array.from(Array(11).keys()).map((elem, index) => (
          <div className="w-1/3 px-2 mb-3" key={index}>
            <div
              onClick={() =>
                selectImage(
                  "https://images.unsplash.com/photo-1640102371408-5fc0c42a8792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
                  ""
                )
              }
              className="bg-gray-100 h-24 text-center flex justify-center items-center flex-col cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1640102371408-5fc0c42a8792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                alt=""
              />
            </div>
          </div>
        ))}
        {Array.from(Array(10).keys()).map((elem, index) => (
          <div className="w-1/3 px-2 mb-3" key={index}>
            <div
              onClick={() =>
                selectImage(
                  "https://images.unsplash.com/photo-1637150899351-0ce1779710c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=621&q=80",
                  ""
                )
              }
              className="bg-gray-100 h-24 text-center flex justify-center items-center flex-col cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1637150899351-0ce1779710c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=621&q=80"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
