import React from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Textarea, ImageField, Toggle } from "@/components/core/FormElements";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
// Block Wrapper
import BlockSection from "@/components/blocks/globals/BlockSection";
import BlockSectionSettings from "@/components/blocks/globals/BlockSectionSettings";

const TestimonialCardWithHeading = ({
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
  testimonialHeading,
  personName,
  personTitle,
  image,
  cardBorder,
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
      blockClassName={`BLOCK__content-blocks__TestimonialCardWithHeading`}
    >
      <div className={`BLOCK__content-blocks__TestimonialCardWithHeading__wrapper`}>
        {/* Block Markup */}
        <div className="container">
          <div
            className={`MODULE__heading-and-description text-center THEME__mw-800 mx-auto ${
              invertText ? `THEME__text-inverted` : ``
            }`}
          >
            {heading && (
              <div className="MODULE__heading-and-description__heading-wrapper">
                <h2 className="MODULE__heading-and-description__heading">{heading}</h2>
              </div>
            )}
            {description && (
              <div className="MODULE__heading-and-description__description-wrapper">
                <p className="MODULE__heading-and-description__description">{description}</p>
              </div>
            )}
          </div>
          <div className="container mt-4">
            <div
              className={`MODULE__testimonial-with-image THEME__bg-white ${
                cardBorder ? `THEME__border` : null
              } THEME__mw-1100 mx-auto`}
            >
              <div className="MODULE__testimonial-with-image__wrapper">
                <div className="MODULE__testimonial-with-image__column MODULE__testimonial-with-image__column-content">
                  <div className="MODULE__testimonial-with-image__top">
                    <div className="MODULE__testimonial-with-image__comma-wrapper">
                      <figure>
                        <svg
                          id="right-quotes-symbol"
                          xmlns="http://www.w3.org/2000/svg"
                          width="36.674"
                          height="31.683"
                          viewBox="0 0 36.674 31.683"
                        >
                          <g id="Group_64" data-name="Group 64" transform="translate(0 0)">
                            <path
                              id="Path_163"
                              data-name="Path 163"
                              d="M266.069,57.511s0,.008,0,.012a8.754,8.754,0,1,0,5.9-8.253c1.964-11.268,10.751-18.534,2.606-12.554C265.546,43.348,266.059,57.256,266.069,57.511Z"
                              transform="translate(-266.061 -34.57)"
                              fill="#2d6659"
                            ></path>
                            <path
                              id="Path_164"
                              data-name="Path 164"
                              d="M8.738,48.793a8.7,8.7,0,0,0-2.827.477C7.875,38,16.662,30.736,8.517,36.716-.515,43.348,0,57.256.008,57.511c0,0,0,.008,0,.012a8.73,8.73,0,1,0,8.73-8.73Z"
                              transform="translate(19.206 -34.57)"
                              fill="#2d6659"
                            ></path>
                          </g>
                        </svg>
                      </figure>
                    </div>
                    {testimonialHeading && (
                      <div className="MODULE__testimonial-with-image__heading-wrapper">
                        <h2 className="MODULE__testimonial-with-image__heading h4">
                          {testimonialHeading}
                        </h2>
                      </div>
                    )}
                  </div>
                  <div className="MODULE__testimonial-with-image__bottom">
                    {personName && (
                      <div className="MODULE__testimonial-with-image__name-wrapper">
                        <h3 className="MODULE__testimonial-with-image__name h6">{personName}</h3>
                      </div>
                    )}
                    {personTitle && (
                      <div className="MODULE__testimonial-with-image__title-wrapper">
                        <h4 className="MODULE__testimonial-with-image__title h7 mb-0">
                          {personTitle}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
                {image && (
                  <div className="MODULE__testimonial-with-image__column MODULE__testimonial-with-image__column-image">
                    <div className="MODULE__testimonial-with-image__image-wrapper">
                      <picture>
                        <img className="THEME__br-8" src={image.url} alt={image.alt} />
                      </picture>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* //End Block Markup */}
      </div>
    </BlockSection>
  );
};

const TestimonialCardWithHeadingSettings = () => {
  const {
    actions: { setProp },
    heading,
    description,
    testimonialHeading,
    image,
    personName,
    personTitle,
    cardBorder,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    description: node.data.props.description,
    testimonialHeading: node.data.props.testimonialHeading,
    personName: node.data.props.personName,
    personTitle: node.data.props.personTitle,
    image: node.data.props.image,
    cardBorder: node.data.props.cardBorder,
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
                    name="heading"
                    onChange={(e) => setProp((props) => (props.heading = e.target.value))}
                    value={heading}
                    placeholder="Add Heading"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Description"
                    name="description"
                    onChange={(e) => setProp((props) => (props.description = e.target.value))}
                    value={description}
                    placeholder="Add Description"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Testimonial Heading"
                    name="testimonialHeading"
                    onChange={(e) =>
                      setProp((props) => (props.testimonialHeading = e.target.value))
                    }
                    value={testimonialHeading}
                    placeholder="Add Testimonial Heading"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Person Name"
                    name="personName"
                    onChange={(e) => setProp((props) => (props.personName = e.target.value))}
                    value={personName}
                    placeholder="Add Person Name"
                  />
                  <Textarea
                    wrapperClassName="mt-5"
                    label="Person Title"
                    name="personTitle"
                    onChange={(e) => setProp((props) => (props.personTitle = e.target.value))}
                    value={personTitle}
                    placeholder="Add Person Title"
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
                    label="Add Card Border"
                    name="cardBorder"
                    onChange={(e) => setProp((props) => (props.cardBorder = e.target.checked))}
                    value={cardBorder}
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

TestimonialCardWithHeading.craft = {
  category: "Testimonial Blocks",
  type: "local",
  preview: "/previews/blocks/TestimonialCardWithHeading.png",
  displayName: "Testimonial Card With Heading",
  props: {
    // Default Block Props
    backgroundColor: { label: "Dark", value: "dark" },
    borderTop: false,
    borderBottom: false,
    paddingTop: 4,
    paddingBottom: 4,
    invertText: true,
    // Default Content Props
    heading: `Why Our People Love Our Platform`,
    description: `Lorem ipsum is simply dummy text of the printing and typesetting industry`,
    testimonialHeading: `Every person on healthcare knows that there are millions people out there every day besides so many community`,
    personName: `Person Name`,
    personTitle: `Person Title`,
    image: {
      url: "/placeholder.png",
      alt: "Placeholder Image",
    },
  },
  related: {
    settings: TestimonialCardWithHeadingSettings,
  },
};

export default TestimonialCardWithHeading;
