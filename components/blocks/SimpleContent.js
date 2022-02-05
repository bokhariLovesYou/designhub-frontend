import React from "react";
import { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { node } from "prop-types";
import { Select, Toggle, Richtext, ImageField } from "@/components/core/FormElements";
import parse from "html-react-parser";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const SimpleContent = ({
  backgroundColor,
  borderTop,
  borderBottom,
  maxWidth,
  content,
  image,
  imageTwo,
}) => {
  const { actions, query } = useEditor();

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
    <section
      data-id={id}
      className={`cursor-grab py-16 ${borderTop && `THEME__border-top`} ${
        borderBottom && `THEME__border-bottom`
      } THEME__bg-${backgroundColor.value} ${isActive && `CUSTOM__selected-block`} ${
        isHovered && `CUSTOM__hovered-block`
      }`}
      ref={(ref) => connect(drag(ref))}
    >
      {isHovered && (
        <div className="absolute top-0 right-0 bg-gray-700 text-white z-10">
          <div className="flex">
            <div
              className="column px-2 py-2 hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                const {
                  data: { type, props },
                } = query.node(id).get();
                actions.add(query.createNode(React.createElement(type, props)), parent, indexToAdd);
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
        <div className={`mx-auto prose max-w-full THEME__mw-${maxWidth.value}`}>
          {parse(content)}
          {image && <img src={image.url} alt={image.alt} />}
          {imageTwo && <img src={imageTwo.url} alt={imageTwo.alt} />}
        </div>
      </div>
    </section>
  );
};

const SimpleContentSettings = () => {
  const {
    actions: { setProp },
    backgroundColor,
    borderTop,
    borderBottom,
    maxWidth,
    content,
    image,
    imageTwo,
  } = useNode((node) => ({
    backgroundColor: node.data.props.backgroundColor,
    borderTop: node.data.props.borderTop,
    borderBottom: node.data.props.borderBottom,
    maxWidth: node.data.props.maxWidth,
    content: node.data.props.content,
    image: node.data.props.image,
    imageTwo: node.data.props.imageTwo,
  }));

  const backgroundColorOptions = [
    { label: "White", value: "white" },
    { label: "Gray", value: "gray" },
    { label: "Sky", value: "sky" },
  ];
  const [backgroundSelected, setbackgroundSelected] = useState(backgroundColor);

  const maxWidthOptions = [
    { label: "Default", value: "default" },
    { label: "500", value: "500" },
    { label: "600", value: "600" },
    { label: "700", value: "700" },
    { label: "800", value: "800" },
    { label: "900", value: "900" },
    { label: "1000", value: "1000" },
  ];
  const [maxWidthSelected, setmaxWidthSelected] = useState(maxWidth);

  const richTextEditor = useRichTextEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose p-4 focus:outline-none CUSTOM__rich-text-editor__content-editable",
      },
    },
    content: content,
    onUpdate({ editor }) {
      setProp((props) => (props.content = editor.getHTML()));
    },
  });

  return (
    <>
      <Select
        label="Background Color"
        options={backgroundColorOptions}
        onChange={(value) => {
          setbackgroundSelected(value), setProp((props) => (props.backgroundColor = value));
        }}
        value={backgroundSelected}
      />

      <Select
        wrapperClassName="mt-5"
        label="Maximum Width"
        options={maxWidthOptions}
        onChange={(value) => {
          setmaxWidthSelected(value), setProp((props) => (props.maxWidth = value));
        }}
        value={maxWidthSelected}
      />

      <Richtext wrapperClassName="mt-5" label="Rich Text" editor={richTextEditor} />

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
      <ImageField
        wrapperClassName="mt-5"
        label="Image"
        image={image}
        name="image"
        handleRemove={() => setProp((props) => (props.image = null))}
        onChange={(e) => setProp((props) => (props.image.alt = e.target.value))}
      />
      <ImageField
        wrapperClassName="mt-5"
        label="Image Two"
        image={imageTwo}
        name="imageTwo"
        handleRemove={() => setProp((props) => (props.imageTwo = null))}
        onChange={(e) => setProp((props) => (props.imageTwo.alt = e.target.value))}
      />
    </>
  );
};

SimpleContent.craft = {
  displayName: "Simple Content",
  props: {
    backgroundColor: { label: "White", value: "white" },
    maxWidth: { label: "Default", value: "default" },
    borderTop: false,
    borderBottom: false,
    content: `<h2>Simple Heading</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>`,
  },
  related: {
    settings: SimpleContentSettings,
  },
};

export default SimpleContent;
