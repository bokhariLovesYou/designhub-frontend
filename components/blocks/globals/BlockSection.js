import React from "react";

const BlockSection = ({
  id,
  enabled,
  isActive,
  isHovered,
  connect,
  actions,
  children,
  query,
  parent,
  indexToAdd,
  drag,
  // **Settings Below
  borderTop,
  borderBottom,
  backgroundColor,
  paddingTop,
  paddingBottom,
  blockClassName,
}) => {
  return (
    <>
      <div className="BS_ENABLED" ref={(ref) => enabled && connect(drag(ref))}>
        <section
          id={`BLOCK__id-${id}`}
          data-id={id}
          className={`BLOCK ${enabled ? `cursor-grab` : ``} py-16 ${
            borderTop ? `THEME__border-top` : ``
          } ${borderBottom ? `THEME__border-bottom` : ``} THEME__bg-${
            backgroundColor && backgroundColor.value
          } ${blockClassName ? blockClassName : ``} ${
            isActive && enabled && `CUSTOM__selected-block`
          } ${isHovered && enabled && `CUSTOM__hovered-block`}`}
          style={{
            paddingTop: paddingTop && paddingTop + "rem",
            paddingBottom: paddingBottom && paddingBottom + "rem",
          }}
        >
          {isHovered && enabled && (
            <div className="absolute top-0 right-0 bg-gray-700 z-10 CUSTOM__text-white">
              <div className="flex">
                <div
                  className="column px-2 py-2 hover:bg-gray-500 cursor-pointer"
                  onClick={() => {
                    const {
                      data: { type, props },
                    } = query.node(id).get();
                    actions.add(
                      query.createNode(React.createElement(type, props)),
                      parent,
                      indexToAdd
                    );
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
          {children}
        </section>
      </div>
    </>
  );
};

export default BlockSection;
