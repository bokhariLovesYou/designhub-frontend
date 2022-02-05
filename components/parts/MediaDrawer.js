import React, { useEffect, useState } from "react";
import Spinner from "@/components/core/Spinner";
import MediaGallery from "@/components/parts/MediaGallery";
import { useAppContext } from "@/context/AppWrapper";

// Fetch/Post
import { useSWRConfig } from "swr";
import axios from "axios";
import { Sleeper } from "@/lib/Helpers";

const MediaDrawer = (props) => {
  const { handlers } = useAppContext();
  const { mutate } = useSWRConfig();
  const [media, setMedia] = useState(null);
  const [mediaKey, setMediaKey] = useState(1);
  const [uploadMedia, setUploadMedia] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  useEffect(() => {
    if (!media) return null;
    setUploadMedia((prevState) => ({ ...prevState, isLoading: true }));
    const url = `${process.env.NEXT_PUBLIC_API_URL}/upload`;
    const formData = new FormData();
    Object.entries(media).forEach(([key, value]) => {
      formData.append("files", value);
    });
    axios
      .post(url, formData)
      .then((res) => {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/upload/files?sort=createdAt:desc`);
        setUploadMedia((prevState) => ({
          ...prevState,
          response: res.data.data,
        }));
        setMedia(null);
        setMediaKey(mediaKey + 1);
      })
      .then(Sleeper(300))
      .then(() => {
        setUploadMedia((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        setUploadMedia((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        setMedia(null);
        setMediaKey(mediaKey + 1);
      });
  }, [media]);

  return (
    <>
      <div
        className={`COMPONENT__tint ${
          props.active && `COMPONENT__tint-active`
        } tint w-full h-full fixed inset-0 bg-gray-700 bg-opacity-80 CUSTOM__z-index-high`}
      ></div>
      <div
        className={`COMPONENT__drawer ${
          props.active && `COMPONENT__drawer-active`
        } bg-white flex flex-col fixed top-0 right-0 bottom-0 w-full max-w-md CUSTOM__z-index-most-high`}
      >
        <div className="COMPONENT__drawer__header bg-theme-notify px-6 py-5 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium">Upload Image</h2>
            </div>
            <div className="flex justify-between flex-col items-center">
              <button
                onClick={() => {
                  handlers.handleDrawer();
                }}
                className="cursor-pointer block"
                type="button"
                aria-label="Close Drawer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className="COMPONENT__drawer__body h-full px-6 py-5 overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          <MediaGallery
            uploadingLength={media && media.length}
            isUploading={uploadMedia.isLoading}
          />
        </div>
        <div className="COMPONENT__drawer__footer px-6 py-5 bg-theme-panel border-t-2 border-theme-border">
          <div className="flex">
            <div
              type="button"
              className={`${
                props.buttonOneLoading
                  ? `inline-flex justify-center align-center opacity-50 pointer-events-none`
                  : ``
              } ${
                props.buttonOneDisabled ? `opacity-50 pointer-events-none` : ``
              } relative cursor-pointer px-6 py-2 hover:bg-theme-panel-hover rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm`}
            >
              {props.buttonOneLoading && <Spinner button />}
              Add Image
              <input
                type="file"
                name="mediaUpload"
                onChange={(event) => {
                  setMedia(event.target.files);
                }}
                files={media}
                key={mediaKey}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                multiple
              />
            </div>
            {/* <button type="submit">Submit</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDrawer;
