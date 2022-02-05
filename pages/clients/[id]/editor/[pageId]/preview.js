import React, { useState, useEffect } from "react";
import SimpleContent from "@/components/blocks/SimpleContent";
import { Container } from "@/components/blocks/Container";
import { useAppContext } from "@/context/AppWrapper";
// Blocks
import { HeadingDescriptionCta, HeadingWithContent } from "@/components/blocks";

import { Editor, Frame, Element } from "@craftjs/core";

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
      <Editor
        enabled={false}
        resolver={{ Container, HeadingWithContent, SimpleContent, HeadingDescriptionCta }}
      >
        <FrameHeader loading={isLoading} clientData={data ? clientData : null} />
        <main>
          <div className="RENDERER">
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

        <FrameFooter />
      </Editor>
    </>
  );
};

export default PagePreview;
