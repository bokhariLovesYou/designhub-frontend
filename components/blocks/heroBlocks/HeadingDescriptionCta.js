import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Textarea, Toggle, ImageField, LinkField } from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const HeadingDescriptionCta = ({
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
  buttonTitle,
  buttonDestination,
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
      blockClassName={`BLOCK__hero-blocks__HeadingDescriptionCTA`}
    >
      <div
        className={`BLOCK__hero-blocks__HeadingDescriptionCTA__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        {backgroundImage && (
          <div className="BLOCK__hero-blocks__HeadingDescriptionCTA__image-wrapper">
            <img src={backgroundImage.url} alt={backgroundImage.alt} />
          </div>
        )}
        {tint && <div className="MODULE__tint MODULE__tint-dark"></div>}
        <div className="container">
          <div className="THEME__mw-700">
            {heading && (
              <div className="BLOCK__hero-blocks__HeadingDescriptionCTA__heading-wrapper">
                <h1 className="BLOCK__hero-blocks__HeadingDescriptionCTA__heading">{heading}</h1>
              </div>
            )}
            {content && (
              <div className="BLOCK__hero-blocks__HeadingDescriptionCTA__description-wrapper">
                <p className="BLOCK__hero-blocks__HeadingDescriptionCTA__description">{content}</p>
              </div>
            )}
            {buttonTitle && (
              <a
                href={buttonDestination ? buttonDestination : "#"}
                target="_blank"
                rel="noreferrer"
              >
                <button type="button" className="THEME__button THEME__button-primary">
                  {buttonTitle}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </BlockSection>
  );
};

const HeadingDescriptionCtaSettings = () => {
  const {
    actions: { setProp },
    heading,
    content,
    buttonTitle,
    buttonDestination,
    backgroundImage,
    tint,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    content: node.data.props.content,
    buttonTitle: node.data.props.buttonTitle,
    buttonDestination: node.data.props.buttonDestination,
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
                    placeholder="Add Content"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Content"
                    onChange={(e) => setProp((props) => (props.content = e.target.value))}
                    value={content}
                    placeholder="Add Content"
                  />
                  <LinkField
                    label="Button Title"
                    linkTitleOnChange={(e) =>
                      setProp((props) => (props.buttonTitle = e.target.value))
                    }
                    linkDestinationOnChange={(e) =>
                      setProp((props) => (props.buttonTitle = e.target.value))
                    }
                    linkTitleValue={buttonTitle}
                    linkDestinationValue={buttonDestination}
                    placeholder="Add Button Title"
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

HeadingDescriptionCta.craft = {
  category: "Hero Blocks",
  type: "local",
  preview: "/previews/blocks/HeadingDescriptionCta.png",
  displayName: "Heading with Description & CTA",
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
    buttonTitle: `Get Started`,
    buttonDestination: `#`,
    backgroundImage: null,
    tint: false,
  },
  related: {
    settings: HeadingDescriptionCtaSettings,
  },
};

export default HeadingDescriptionCta;
