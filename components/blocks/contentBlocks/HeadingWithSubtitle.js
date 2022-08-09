import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Textarea, Toggle, ImageField } from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const HeadingWithSubtitle = ({
  // Block Settings
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  invertText,
  // Content Settings
  heading,
  content,
  backgroundImage,
  tint,
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
      blockClassName={`BLOCK__content-blocks__HeadingWithSubtitle`}
    >
      <div
        className={`BLOCK__content-blocks__HeadingWithSubtitle__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        {backgroundImage && (
          <div className="MODULE__absolute-image">
            <img src={backgroundImage.url} alt={backgroundImage.alt} />
          </div>
        )}
        {tint && <div className="MODULE__tint MODULE__tint-dark"></div>}
        <div className="container">
          <div className="THEME__mw-800 text-center mx-auto position-relative THEME__z-index-1">
            {heading && (
              <div className="BLOCK__content-blocks__HeadingWithSubtitle__heading-wrapper">
                <h2 className="BLOCK__content-blocks__HeadingWithSubtitle__heading h1">
                  {heading}
                </h2>
              </div>
            )}
            {content && (
              <div className="BLOCK__content-blocks__HeadingWithSubtitle__description-wrapper">
                <p className="BLOCK__content-blocks__HeadingWithSubtitle__description">{content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockSection>
  );
};

const HeadingWithSubtitleSettings = () => {
  const {
    actions: { setProp },
    heading,
    content,
    backgroundImage,
    tint,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    content: node.data.props.content,
    backgroundImage: node.data.props.backgroundImage,
    tint: node.data.props.tint,
  }));
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
                  <Textarea
                    label="Heading"
                    onChange={(e) => setProp((props) => (props.heading = e.target.value))}
                    value={heading}
                    placeholder="Add Heading"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Content"
                    onChange={(e) => setProp((props) => (props.content = e.target.value))}
                    value={content}
                    placeholder="Add Content"
                  />
                  <ImageField
                    wrapperClassName="mt-5"
                    label="Background Image"
                    image={backgroundImage}
                    name="backgroundImage"
                    handleRemove={() => setProp((props) => (props.backgroundImage = null))}
                    onChange={(e) =>
                      setProp((props) => (props.backgroundImage.alt = e.target.value))
                    }
                  />
                  <Toggle
                    wrapperClassName="mt-5"
                    label="Add Background Tint"
                    onChange={(e) => setProp((props) => (props.tint = e.target.checked))}
                    value={tint}
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

HeadingWithSubtitle.craft = {
  category: "Content Blocks",
  type: "local",
  preview: "/previews/blocks/HeadingWithSubtitle.png",
  displayName: "Heading with Subtitle",
  props: {
    // Default Block Props
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    // Default Content Props
    heading: `Powerful Section Heading to Insure Readability`,
    content: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliq Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam`,
    backgroundImage: null,
    tint: false,
  },
  related: {
    settings: HeadingWithSubtitleSettings,
  },
};

export default HeadingWithSubtitle;
