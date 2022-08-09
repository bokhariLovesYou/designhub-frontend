import React, { useEffect, useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Richtext, Select } from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
// Rich Text
import parse from "html-react-parser";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import RichTextExtensions from "@/lib/RichTextExtensions";
// Block Wrapper
import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const SimpleContent = ({
  // Block Settings
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  invertText,
  // Content Settings
  content,
  maxWidth,
}) => {
  const { enabled, actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

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
    <BlockSection
      id={id}
      enabled={enabled}
      isActive={isActive}
      isHovered={isHovered}
      connect={connect}
      actions={actions}
      query={query}
      parent={parent}
      indexToAdd={indexToAdd}
      drag={drag}
      borderTop={borderTop}
      borderBottom={borderBottom}
      backgroundColor={backgroundColor}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      invertText={invertText}
      blockClassName={`BLOCK__content-blocks__SimpleContent`}
    >
      <div
        className={`BLOCK__content-blocks__SimpleContent__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        {content && (
          <div className="container">
            <div
              className={`mx-auto MODULE__article-content max-w-full THEME__mw-${maxWidth?.value}`}
            >
              {parse(content)}
            </div>
          </div>
        )}
      </div>
    </BlockSection>
  );
};

const SimpleContentSettings = () => {
  const {
    actions: { setProp },
    content,
    maxWidth,
  } = useNode((node) => ({
    content: node.data.props.content,
    maxWidth: node.data.props.maxWidth,
  }));

  const maxWidthOptions = [
    { label: "Default", value: "default" },
    { label: "500", value: "500" },
    { label: "600", value: "600" },
    { label: "700", value: "700" },
    { label: "800", value: "800" },
    { label: "900", value: "900" },
    { label: "1000", value: "1000" },
  ];
  const [maxWidthSelected, setMaxWidthSelected] = useState(maxWidth);

  const richTextEditor = useRichTextEditor({
    extensions: RichTextExtensions,
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
      <div className="">
        <div className="">
          <Disclosure defaultOpen={false}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 font-medium text-left hover:bg-theme-panel border-theme-border border-b text-theme-text-light">
                  <span>Block Settings</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-theme-focus-green-dark`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-5 pb-6 px-4 pb-2 bg-theme-panel-dark border-theme-border border-b">
                  <BlockSectionSettings />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 font-medium text-left hover:bg-theme-panel border-theme-border border-b text-theme-text-light">
                  <span>Content Settings</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-theme-focus-green-dark`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-5 pb-6 px-4 pb-2 bg-theme-panel-dark border-theme-border border-b">
                  <Select
                    wrapperClassName=""
                    label="Maximum Width"
                    options={maxWidthOptions}
                    onChange={(value) => {
                      setMaxWidthSelected(value), setProp((props) => (props.maxWidth = value));
                    }}
                    value={maxWidthSelected}
                  />
                  <Richtext
                    wrapperClassName="mt-5"
                    label="Rich Text"
                    name="content"
                    editor={richTextEditor}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
};

SimpleContent.craft = {
  category: "Content Blocks",
  type: "local",
  preview: "/previews/blocks/SimpleContent.png",
  displayName: "Simple Content",
  props: {
    // Default Block Props
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    // Default Content Props
    content: `<h2>Powerful Section Heading to Insure Readability</h2><p> <strong> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat </strong> </p><p> gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p><p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliq </p>`,
    maxWidth: { label: "Default", value: "default" },
  },
  related: {
    settings: SimpleContentSettings,
  },
};

export default SimpleContent;
