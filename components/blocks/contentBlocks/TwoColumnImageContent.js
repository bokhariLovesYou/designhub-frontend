import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Textarea, ImageField, LinkField, Richtext, Toggle } from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
// Rich Text
import parse from "html-react-parser";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import RichTextExtensions from "@/lib/RichTextExtensions";
// Block Wrapper
import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const TwoColumnImageContent = ({
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
  image,
  invertColumns,
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
      blockClassName={`BLOCK__content-blocks__TwoColumnImageContent`}
    >
      <div
        className={`BLOCK__content-blocks__TwoColumnImageContent__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        <div className="container position-relative">
          <div className="row">
            <div
              className={`${
                invertColumns
                  ? `col-lg-6 mb-4 mb-lg-0 order-lg-1`
                  : `col-lg-6 mb-4 mb-lg-0 order-lg-2`
              }`}
            >
              <div
                className={`${
                  invertColumns
                    ? `BLOCK__content-blocks__twoColumnWithImage__content-wrapper pe-lg-4`
                    : `BLOCK__content-blocks__twoColumnWithImage__content-wrapper ps-lg-4`
                }`}
              >
                {heading && (
                  <div className="BLOCK__content-blocks__twoColumnWithImage__heading-wrapper">
                    <h2 className="BLOCK__content-blocks__twoColumnWithImage__heading">
                      {heading}
                    </h2>
                  </div>
                )}
                {content && <div className="MODULE__richtext-field">{parse(content)}</div>}

                {buttonTitle && (
                  <div className="MODULE__button-wrapper mt-3 pt-2">
                    <a
                      href={buttonDestination ? buttonDestination : "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button type="button" className="THEME__button THEME__button-primary">
                        {buttonTitle}
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
            {image && (
              <div className={`${invertColumns ? `col-lg-6 order-lg-2` : `col-lg-6 order-lg-1`}`}>
                <div className={`BLOCK__content-blocks__twoColumnWithImage__image-wrapper`}>
                  <figure className="my-0 mx-0">
                    <img className="THEME__br-8" src={image.url} alt={image.alt} />
                  </figure>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockSection>
  );
};

const TwoColumnImageContentSettings = () => {
  const {
    actions: { setProp },
    heading,
    content,
    buttonTitle,
    buttonDestination,
    image,
    invertColumns,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    content: node.data.props.content,
    buttonTitle: node.data.props.buttonTitle,
    buttonDestination: node.data.props.buttonDestination,
    image: node.data.props.image,
    invertColumns: node.data.props.invertColumns,
  }));

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
                  <Textarea
                    label="Heading"
                    onChange={(e) => setProp((props) => (props.heading = e.target.value))}
                    value={heading}
                    placeholder="Add Content"
                  />
                  <Richtext
                    wrapperClassName="mt-5"
                    label="Rich Text"
                    name="content"
                    editor={richTextEditor}
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
                    label="Image"
                    image={image}
                    name="image"
                    handleRemove={() => setProp((props) => (props.image = null))}
                    onChange={(e) => setProp((props) => (props.image.alt = e.target.value))}
                  />
                  <Toggle
                    wrapperClassName="mt-5"
                    label="Invert Columns"
                    name="invertColumns"
                    onChange={(e) => setProp((props) => (props.invertColumns = e.target.checked))}
                    value={invertColumns}
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

TwoColumnImageContent.craft = {
  category: "Content Blocks",
  type: "local",
  preview: "/previews/blocks/TwoColumnImageContent.png",
  displayName: "Two Column with Image",
  props: {
    // Default Block Props
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    // Default Content Props
    heading: `Powerful Section Heading to Insure Readability`,
    content: `<p> <strong> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat </strong> </p><p> gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p><p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliq </p>`,
    buttonTitle: `Get Started`,
    buttonDestination: `#`,
    image: {
      url: "/placeholder.png",
      alt: "Placeholder Image",
    },
  },
  related: {
    settings: TwoColumnImageContentSettings,
  },
};

export default TwoColumnImageContent;
