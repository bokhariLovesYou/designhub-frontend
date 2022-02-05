import React from "react";
import { useNode } from "@craftjs/core";

export const Container = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div className="COMPONENT__editor__frame" ref={(ref) => connect(drag(ref))}>
      {children}
    </div>
  );
};
