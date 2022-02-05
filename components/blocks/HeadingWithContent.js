import React from "react";
import { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { node } from "prop-types";
import { Textarea, Select, Toggle, Richtext } from "@/components/core/FormElements";

const HeadingWithContent = ({ backgroundColor, heading, content, borderTop, borderBottom }) => {
  const { enabled, actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  // console.log(enabled);

  const {
    connectors: { connect, drag },
    id,
    isActive,
    isHovered,
    parent,
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHovered: node.events.hovered,
    parent: node.data.parent,
  }));
  let parentNode;
  let indexToAdd;
  if (!parent) {
    return;
  }
  parentNode = query.node(parent).get();
  indexToAdd = parentNode.data.nodes.indexOf(id) + 1;

  return (
    <div className="BS_ENABLED" ref={(ref) => enabled && connect(drag(ref))}>
      <section
        id={`BLOCK__id-${id}`}
        data-id={id}
        className={`${enabled ? `cursor-grab` : ``} py-16 ${borderTop ? `THEME__border-top` : ``} ${
          borderBottom ? `THEME__border-bottom` : ``
        } THEME__bg-${backgroundColor && backgroundColor.value} ${
          isActive && enabled && `CUSTOM__selected-block`
        } ${isHovered && enabled && `CUSTOM__hovered-block`}`}
      >
        {isHovered && enabled && (
          <div className="absolute top-0 right-0 bg-gray-700 text-white z-10">
            <div className="flex">
              <div
                className="column px-2 py-2 hover:bg-gray-500 cursor-pointer"
                onClick={() => {
                  const {
                    data: { type, props },
                  } = query.node(id).get();
                  actions.add(
                    query.createNode(React.createElement(type, props)),
                    parent,
                    indexToAdd
                  );
                  setTimeout(() => {
                    actions.selectNode(query.node(parent).get().data.nodes[indexToAdd]);
                  }, 10);
                }}
              >
                <div className="clone">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
              </div>

              <div
                className="column px-2 py-2 hover:bg-gray-500 cursor-pointer"
                onClick={() => {
                  actions.delete(id);
                }}
              >
                <div className="delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="THEME__mw-800 mx-auto text-center">
            <h1 className="">{heading}</h1>
          </div>
          <div className="theme-box prose mx-auto text-center">
            <p>{content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeadingWithContentSettings = () => {
  const {
    actions: { setProp },
    heading,
    content,
    backgroundColor,
    borderTop,
    borderBottom,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    content: node.data.props.content,
    backgroundColor: node.data.props.backgroundColor,
    borderTop: node.data.props.borderTop,
    borderBottom: node.data.props.borderBottom,
  }));

  const backgroundColorOptions = [
    { label: "White", value: "white" },
    { label: "Gray", value: "gray" },
    { label: "Sky", value: "sky" },
  ];
  const [backgroundSelected, setbackgroundSelected] = useState(backgroundColor);

  return (
    <>
      <div className="py-5 px-4">
        <Select
          label="Background Color"
          options={backgroundColorOptions}
          onChange={(value) => {
            setbackgroundSelected(value), setProp((props) => (props.backgroundColor = value));
          }}
          value={backgroundSelected}
        />
        <Textarea
          wrapperClassName="mt-5"
          label="Heading"
          onChange={(e) => setProp((props) => (props.heading = e.target.value))}
          value={heading}
          placeholder="Add Content"
        />
        <Textarea
          wrapperClassName="mt-5"
          label="Content"
          onChange={(e) => setProp((props) => (props.content = e.target.value))}
          value={content}
          placeholder="Add Content"
        />
        <Toggle
          wrapperClassName="mt-5"
          label="Add Border Top"
          onChange={(e) => setProp((props) => (props.borderTop = e.target.checked))}
          value={borderTop}
        />
        <Toggle
          wrapperClassName="mt-5"
          label="Add Border Bottom"
          onChange={(e) => setProp((props) => (props.borderBottom = e.target.checked))}
          value={borderBottom}
        />
      </div>
    </>
  );
};

HeadingWithContent.craft = {
  displayName: "Heading With Content",
  preview: "/previews/blocks/HeadingWithContent.png",
  props: {
    heading: "Large Heading!",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
  },
  related: {
    settings: HeadingWithContentSettings,
  },
};

export default HeadingWithContent;
