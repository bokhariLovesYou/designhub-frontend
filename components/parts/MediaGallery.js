import React from "react";
import { useAppContext } from "@/context/AppWrapper";
import { useEditor } from "@craftjs/core";
// Fetchers
import Spinner from "@/components/core/Spinner";
import axios from "axios";
import { Sleeper } from "@/lib/Helpers";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useMediaGET } from "@/lib/Fetcher";

const MediaGallery = (props) => {
  const { data, isLoading, isError } = useMediaGET();
  const { globalState, richTextMedia, handlers } = useAppContext();
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

  const selectImage = (url, alt) => {
    actions.setProp(selected.id, (props) => {
      if (richTextMedia.intent) {
        return null;
      }
      if (props?.hasRepeater) {
        const repeaterName = globalState?.repeaterMeta?.repeaterName;
        const selectedIndex = globalState?.repeaterMeta?.editingIndex;
        const fieldName = globalState?.mediaGalleryFieldSelected;
        props[repeaterName][selectedIndex][fieldName] = { url, alt };
      } else {
        props[globalState.mediaGalleryFieldSelected] = { url, alt };
      }
    });
    handlers.handleRichTextImageSource(url);
    setTimeout(() => {
      handlers.handleRichTextImageIntent(false);
    }, 200);
    handlers.handleDrawer();
  };

  return (
    <>
      {isLoading && <></>}
      {data && (
        <>
          {data.length > 0 ? (
            <>
              <div className="mb-4">
                <h2 className="font-medium text-theme-text">Recent Uploads</h2>
              </div>
              <div className="flex flex-wrap -mx-2">
                {props.isUploading && props.uploadingLength && (
                  <>
                    {Array.from(Array(props.uploadingLength).keys()).map((elem, index) => {
                      return (
                        <div className="w-1/3 px-2 mb-3" key={index}>
                          <span className="COMPONENT__skeleton-box h-24 w-32 block rounded flex justify-center items-center">
                            <Spinner button />
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
                {data.map((elem, index) => {
                  const image = {
                    thumbnail: elem.mime.includes("image")
                      ? elem.formats
                        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${elem.formats.small.url}`
                        : `${process.env.NEXT_PUBLIC_MEDIA_URL}${elem.url}`
                      : "/document.png",
                    full: elem.mime.includes("image")
                      ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${elem.url}`
                      : "/document.png",
                  };
                  return (
                    <div className="w-1/3 px-2 mb-3" key={index}>
                      <div
                        onClick={() => selectImage(image.full, "")}
                        style={{ minWidth: "96px" }}
                        className="bg-gray-100 h-24 text-center flex justify-center items-center flex-col cursor-pointer"
                      >
                        <img
                          className="w-full h-full object-cover rounded"
                          src={image.thumbnail}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <span className="text-theme-text">Upload Media</span>
          )}
        </>
      )}
    </>
  );
};

export default MediaGallery;
