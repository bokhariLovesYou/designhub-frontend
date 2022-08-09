import React from "react";
import { useAppContext } from "@/context/AppWrapper";
import { Richtext } from "@/components/core/FormElements";
import { useEditor } from "@craftjs/core";
import { useEditor as useRichTextEditor } from "@tiptap/react";
import RichTextExtensions from "@/lib/RichTextExtensions";

const ExpandedRichTextEditor = (props) => {
  const { handlers, globalState } = useAppContext();
  const { actions, selected } = useEditor((state) => {
    const currentNodeId = [...state.events.selected][0];
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        displayName: state.nodes[currentNodeId].data.displayName,
        name: state.nodes[currentNodeId].data.name,
        props: state.nodes[currentNodeId].data.props,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  const richTextEditor = useRichTextEditor({
    extensions: RichTextExtensions,
    editorProps: {
      attributes: {
        class:
          "prose p-4 focus:outline-none CUSTOM__rich-text-editor__content-editable CUSTOM__rich-text-editor__content-editable-full-height",
      },
    },
    content: selected?.props[globalState.richTextSelectedFieldName],
    onUpdate({ editor }) {
      actions.setProp(selected.id, (props) => {
        props[globalState?.richTextSelectedFieldName] = editor.getHTML();
      });
    },
  });

  return (
    <>
      <div className="bg-theme-panel px-8 py-8" style={{ height: "calc(100vh - 100px)" }}>
        <div className="bg-white px-8 py-10 border border-theme-border">
          <div className="mb-2">
            <span
              className="text-theme-notify text-sm cursor-pointer flex items-center max-w-max"
              onClick={() => handlers.handleExpandedRichText(false, null)}
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              Back to page
            </span>
          </div>
          <h2 className="text-xl font-medium">Edit Rich Text Content</h2>
          <Richtext expanded wrapperClassName="mt-5" editor={richTextEditor} />
        </div>
      </div>
    </>
  );
};

export default ExpandedRichTextEditor;
