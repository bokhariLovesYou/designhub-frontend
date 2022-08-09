import React, { useState, useEffect } from "react";
import { Container } from "@/components/blocks/Container";
import { useAppContext } from "@/context/AppWrapper";
import Logo from "@/resources/Logo";
import { Editor, Frame, Element } from "@craftjs/core";
// All Blocks
import AllBlocks from "@/lib/AllBlocks";
// SEO
import { NextSeo } from "next-seo";
// Static Blocks
import FrameHeader from "@/components/blocks/staticBlocks/FrameHeader";
import FrameFooter from "@/components/blocks/staticBlocks/FrameFooter";
// Compressor
import lz from "lzutf8";
// Fetchers
import Spinner from "@/components/core/Spinner";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { usePageByIdGET } from "@/lib/Fetcher";

const PagePreview = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { pageId, id } = router.query;
  const { data, isLoading, isError } = usePageByIdGET(pageId);
  const [pageReady, setPageReady] = useState(false);
  const [previewCounter, setPreviewCounter] = useState(0);
  let pageData;
  let clientData;
  let editorState;
  if (data) {
    pageData = data.data.attributes;
    clientData = data.data.attributes.client.data.attributes;
    editorState = pageData.draftEditorState
      ? lz.decompress(lz.decodeBase64(pageData.draftEditorState))
      : pageData.draftEditorState;
    setTimeout(() => {
      setPageReady(true);
    }, 300);
  }

  const refreshPreview = () => {
    setPageReady(false);
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/pages/${id}?populate=blueprint&populate=client`);
    setPreviewCounter(previewCounter + 1);
    setTimeout(() => {
      setPageReady(true);
    }, 800);
  };

  return (
    <>
      <NextSeo
        title={data ? pageData.title : `Generating Preview | Design Lab | OneIMS`}
        description={data ? pageData.description : `Preview page`}
      />
      <Editor enabled={false} resolver={AllBlocks}>
        <FrameHeader
          className="FRAME__sidebar-enabled mx-auto lg:mr-0 lg:ml-auto bg-white relative z-10"
          hideLogoOnLarge={true}
          loading={isLoading}
          clientData={data ? clientData : null}
        />
        <main>
          <div className="viewport">
            <div
              style={{ width: "16.5rem" }}
              className="aside hidden lg:block bg-white border-r-2 border-r-theme-panel fixed z-2 right-auto top-0 pb-10 overflow-y-auto h-screen"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="https://tailwindcss.com/_next/static/media/docs@30.beeb08605f12f699c5abc3814763b65e.avif"
                  alt=""
                />
              </div>
              <div className="pt-3 pb-3 px-6 border-b-2 border-b-theme-panel">
                <div className="text-center text-theme-primary">
                  <Logo primary />
                </div>
              </div>
              <div className="px-6 pt-6">
                <h2 className="font-small mb-2">Navigation</h2>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-40 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-36 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-48 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                {/*  */}
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-36 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-48 inline-block rounded-xl"></span>
                <span className="COMPONENT__skeleton-box mt-2 h-5 w-44 inline-block rounded-xl"></span>
              </div>
            </div>
            <div className="RENDERER FRAME__sidebar-enabled lg:ml-auto lg:mr-0">
              {data && (
                <>
                  <div style={{ display: pageReady ? "block" : "none" }}>
                    <Frame key={previewCounter} data={editorState}>
                      <Element is={Container} padding={0} background="#fff"></Element>
                    </Frame>
                  </div>
                </>
              )}
              {!pageReady && (
                <>
                  <div
                    className="flex justify-center items-center flex-col"
                    style={{ height: "700px" }}
                  >
                    <Spinner />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        {pageReady && (
          <div
            onClick={refreshPreview}
            className="px-3 py-3 shadow-lg rounded fixed  bg-white border-2 border-theme-border bottom-6 right-6 hover:bg-gray-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <FrameFooter className="FRAME__sidebar-enabled mx-auto lg:mr-0 lg:ml-auto" />
      </Editor>
    </>
  );
};

export default PagePreview;
