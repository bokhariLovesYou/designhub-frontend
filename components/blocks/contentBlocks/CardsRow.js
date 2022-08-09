import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import {
  Textarea,
  RepeaterField,
  ImageField,
  LinkField,
  Richtext,
} from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
// Repeater Fields
import { arrayMove } from "@dnd-kit/sortable";
// Block Wrapper
import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const CardsRow = ({
  // Block Settings
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  invertText,
  // Content Settings
  heading,
  description,
  repeater,
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
      blockClassName={`BLOCK__content-blocks__CardsRow`}
    >
      <div
        className={`BLOCK__content-blocks__CardsRow__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        {/* Markup */}
        <div className="container">
          <div className="MODULE__heading-with-description THEME__mw-900 text-left text-center text-md-start">
            {heading && (
              <div className="MODULE__heading-with-description__heading-wrapper">
                <h2 className="MODULE__heading-with-description__heading h2">{heading}</h2>
              </div>
            )}
            {description && (
              <div className="MODULE__heading-with-description__description-wrapper">
                <p className="MODULE__heading-with-description__description">{description}</p>
              </div>
            )}
          </div>
        </div>
        {repeater && repeater?.length > 0 && (
          <div className="container mt-4 pt-3">
            <div className="row">
              {repeater.map((elem, index) => {
                return (
                  <div key={index} className="col-lg-4 mb-4 mb-lg-0">
                    <div className="MODULE__card__var-01 relative">
                      {elem?.image && (
                        <div className="MODULE__card__var-01__top">
                          <div className="MODULE__card__var-01__image-wrapper">
                            <img
                              className="THEME__br-8"
                              src={elem.image?.url}
                              alt={elem.image?.alt}
                            />
                          </div>
                        </div>
                      )}
                      <div className="MODULE__card__var-01__bottom">
                        {elem?.label && (
                          <span
                            style={{ fontSize: "0.8rem" }}
                            className="THEME__text-body-light d-block mb-1"
                          >
                            {elem?.label}
                          </span>
                        )}
                        {elem?.heading && (
                          <div className="MODULE__card__var-01__heading-wrapper">
                            <h3 className="MODULE__card__var-01__heading h5">{elem?.heading}</h3>
                          </div>
                        )}
                        {elem?.description && (
                          <div className="MODULE__card__var-01__desc-wrapper">
                            <p className="MODULE__card__var-01__desc">{elem?.description}</p>
                          </div>
                        )}
                      </div>
                      {elem?.buttonText && (
                        <div className="MODULE__card__var-01__button-wrapper mt-auto">
                          <div className="MODULE__button-wrapper">
                            <a href={elem?.buttonDestination} target="_blank" rel="noreferrer">
                              <button type="button" className="THEME__button THEME__button-link">
                                {elem?.buttonText}
                              </button>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* //End Markup */}
      </div>
    </BlockSection>
  );
};

const repeaterFields = (id) => {
  let meta = {
    image: {
      url: "/placeholder.png",
      alt: "Placeholder Image",
    },
    heading: "5 Simple Steps For Organized Finances",
    label: "Generic title for the card",
    description:
      "Having organized finances allows you to relax, knowing that you won't be stressed fr...",
    buttonTitle: "Read More",
    buttonDestination: "#",
    id,
    sortingLabel: "heading", // required
  };

  return meta;
};

let defaultRepeaterLength = 3;

const defaultRepeaterData = () => {
  let arr = [];
  for (let i = 0; i < defaultRepeaterLength; i++) {
    arr.push(repeaterFields(i + 1));
  }
  return arr;
};

const CardsRowSettings = () => {
  const {
    actions: { setProp },
    heading,
    description,
    repeater,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    description: node.data.props.description,
    repeater: node.data.props.repeater,
  }));

  if (repeater.length > 0) {
    const repeaterCopy = [...repeater];
    const highestId = repeaterCopy.sort((a, b) => b.id - a.id)[0]?.id;
    defaultRepeaterLength = highestId;
  }

  const [repeaterEditingMeta, setRepeaterEditingMeta] = useState({
    editing: false,
    index: null,
  });

  const [readyToAddIndex, setReadyToAddIndex] = useState(defaultRepeaterLength + 1);

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
                    label="Description"
                    onChange={(e) => setProp((props) => (props.description = e.target.value))}
                    value={description}
                    placeholder="Add Description"
                  />
                  <RepeaterField
                    wrapperClassName="mt-5"
                    label="Repeater"
                    name="repeater"
                    repeaterEditingMeta={repeaterEditingMeta}
                    repeater={repeater}
                    handleAdd={() => {
                      setReadyToAddIndex(readyToAddIndex + 1);
                      setProp((props) => {
                        return (props.repeater = [
                          ...props.repeater,
                          repeaterFields(readyToAddIndex),
                        ]);
                      });
                    }}
                    handleMove={(active, over) => {
                      setProp((props) => {
                        if (active && over) {
                          const oldIndex = props.repeater.findIndex((x) => x.id === active.id);
                          const newIndex = props.repeater.findIndex((x) => x.id === over.id);
                          const output = arrayMove(props.repeater, oldIndex, newIndex);
                          return (props.repeater = output);
                        }
                      });
                    }}
                    handleEdit={(index) => {
                      setRepeaterEditingMeta({
                        editing: true,
                        index,
                      });
                    }}
                    handleFinishEdit={(index) => {
                      setRepeaterEditingMeta({
                        editing: false,
                        index,
                      });
                    }}
                    handleClone={(index) => {
                      setReadyToAddIndex(readyToAddIndex + 1);
                      setProp((props) => {
                        let output = [...repeater];
                        let item = { ...output[index] };
                        item.id = readyToAddIndex;
                        output = [...repeater, item];
                        return (props.repeater = output);
                      });
                    }}
                    handleDelete={(index) =>
                      setProp((props) => {
                        let output = [...repeater];
                        output.splice(index, 1);
                        return (props.repeater = output);
                      })
                    }
                  >
                    {repeaterEditingMeta && (
                      <>
                        {repeater.map((elem, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: `${
                                  index === repeaterEditingMeta.index ? "block" : "none"
                                }`,
                              }}
                            >
                              <ImageField
                                wrapperClassName="mt-5"
                                label="Image"
                                image={elem.image}
                                name="image"
                                handleRemove={() =>
                                  setProp((props) => (props.repeater[index].image = null))
                                }
                                onChange={(e) =>
                                  setProp(
                                    (props) => (props.repeater[index].image.alt = e.target.value)
                                  )
                                }
                              />
                              <Textarea
                                wrapperClassName="mt-5"
                                label="Label"
                                onChange={(e) =>
                                  setProp((props) => (props.repeater[index].label = e.target.value))
                                }
                                value={elem.label}
                                placeholder="Add Label"
                              />
                              <Textarea
                                wrapperClassName="mt-5"
                                label="Heading"
                                onChange={(e) =>
                                  setProp(
                                    (props) => (props.repeater[index].heading = e.target.value)
                                  )
                                }
                                value={elem.heading}
                                placeholder="Add Heading"
                              />
                              <Textarea
                                wrapperClassName="mt-5"
                                label="Description"
                                onChange={(e) =>
                                  setProp(
                                    (props) => (props.repeater[index].description = e.target.value)
                                  )
                                }
                                value={elem.description}
                                placeholder="Add Description"
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </RepeaterField>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
};

CardsRow.craft = {
  category: "Content Blocks",
  type: "local",
  preview: "/previews/blocks/CardsRow.png",
  displayName: "Cards Row",
  props: {
    // Meta
    hasRepeater: true,
    // Default Block Props
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    // Default Content Props
    heading: "Powerful Section Heading to Insure Readability",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
    repeater: defaultRepeaterData(),
  },
  related: {
    settings: CardsRowSettings,
  },
};

export default CardsRow;
