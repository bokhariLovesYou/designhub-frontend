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
// Rich Text
import parse from "html-react-parser";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// Block Wrapper
import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const RepeaterTest = ({
  // Block Settings
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  invertText,
  // Content Settings
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
      blockClassName={`BLOCK__content-blocks__RepeaterTest`}
    >
      <div
        className={`BLOCK__content-blocks__RepeaterTest__wrapper ${
          invertText ? `THEME__text-inverted` : ``
        }`}
      >
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0 order-lg-2">
              <div className="BLOCK__content-blocks__twoColumnWithImage__content-wrapper ps-lg-4">
                {repeater &&
                  repeater.map((elem, index) => {
                    return (
                      <div
                        key={index}
                        className="BLOCK__content-blocks__twoColumnWithImage__heading-wrapper"
                      >
                        <h2 className="BLOCK__content-blocks__twoColumnWithImage__heading">
                          {elem.heading}
                        </h2>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockSection>
  );
};

const RepeaterTestSettings = () => {
  const {
    actions: { setProp },
    repeater,
  } = useNode((node) => ({
    repeater: node.data.props.repeater,
  }));

  const repeaterFields = (id) => {
    return {
      heading: "Lorem Ipsum",
      id,
    };
  };

  const [repeaterEditingMeta, setRepeaterEditingMeta] = useState({
    editing: false,
    index: null,
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
                  <RepeaterField
                    label="Repeater"
                    name="repeater"
                    repeaterEditingMeta={repeaterEditingMeta}
                    repeater={repeater}
                    handleAdd={() =>
                      setProp((props) => {
                        return (props.repeater = [
                          ...props.repeater,
                          repeaterFields(props.repeater?.length + 1),
                        ]);
                      })
                    }
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
                    handleClone={(index) =>
                      setProp((props) => {
                        let output = [...repeater];
                        let item = { ...output[index] };
                        item.id = props.repeater?.length + 1;
                        output = [...repeater, item];
                        return (props.repeater = output);
                      })
                    }
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
                              <Textarea
                                key={index}
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

RepeaterTest.craft = {
  category: "Hero Blocks",
  type: "local",
  preview: "/previews/blocks/RepeaterTest.png",
  displayName: "Repeater Test",
  props: {
    // Default Block Props
    backgroundColor: { label: "White", value: "white" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    // Default Content Props
    repeater: [],
  },
  related: {
    settings: RepeaterTestSettings,
  },
};

export default RepeaterTest;
