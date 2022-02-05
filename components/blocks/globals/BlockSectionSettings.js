import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Textarea, Select, Toggle, Slider } from "@/components/core/FormElements";

const BlockSectionSettings = () => {
  const {
    actions: { setProp },
    backgroundColor,
    borderTop,
    borderBottom,
    paddingTop,
    paddingBottom,
    invertText,
  } = useNode((node) => ({
    backgroundColor: node.data.props.backgroundColor,
    borderTop: node.data.props.borderTop,
    borderBottom: node.data.props.borderBottom,
    paddingTop: node.data.props.paddingTop,
    paddingBottom: node.data.props.paddingBottom,
    invertText: node.data.props.invertText,
  }));

  const backgroundColorOptions = [
    { label: "White", value: "white" },
    { label: "Gray", value: "gray" },
    { label: "Sky", value: "sky" },
    { label: "Dark", value: "dark" },
  ];
  const [backgroundSelected, setbackgroundSelected] = useState(backgroundColor);

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
      <Slider
        wrapperClassName="mt-5"
        label="Padding Top"
        name="paddingTop"
        onChange={(value) => setProp((props) => (props.paddingTop = value))}
        defaultValue={paddingTop}
      />
      <Slider
        wrapperClassName="mt-5"
        label="Padding Bottom"
        name="paddingBottom"
        onChange={(value) => setProp((props) => (props.paddingBottom = value))}
        defaultValue={paddingBottom}
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
      <Toggle
        wrapperClassName="mt-5"
        label="Invert Text Color"
        onChange={(e) => setProp((props) => (props.invertText = e.target.checked))}
        value={invertText}
      />
    </>
  );
};

export default BlockSectionSettings;
