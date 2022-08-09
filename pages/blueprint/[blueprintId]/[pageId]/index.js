import React from "react";
import { Container } from "@/components/blocks/Container";
import Logo from "@/resources/Logo";
import { Editor, Frame, Element } from "@craftjs/core";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { SSR__PageAndBlueprintByIdGET } from "@/lib/Fetcher";

const PublicBluePrintPage = ({ archiveData, singularData }) => {
  const router = useRouter();
  console.log(router.query.pageId);
  let pageData;
  let clientData;
  let editorState;
  let blueprintId;
  let navigation;
  if (singularData) {
    pageData = singularData.data.attributes;
    blueprintId = singularData.data.attributes.blueprint.data.id;
    clientData = singularData.data.attributes.client.data.attributes;
    editorState = pageData.editorState
      ? lz.decompress(lz.decodeBase64(pageData.editorState))
      : pageData.editorState;
  }

  if (archiveData) {
    navigation = archiveData.data.attributes.pages.data;
    navigation = navigation.filter(
      (elem, index) => navigation[index].attributes.status === "published"
    );
    navigation = navigation.sort((a, b) => a.attributes.orderId - b.attributes.orderId);
  }

  return (
    <>
      <NextSeo title={pageData.title} description={pageData.description} />
      <Editor enabled={false} resolver={AllBlocks}>
        <FrameHeader
          className="FRAME__sidebar-enabled mx-auto lg:mr-0 lg:ml-auto bg-white relative z-10"
          hideLogoOnLarge={true}
          clientData={singularData ? clientData : null}
          logoDestination={`/blueprint/${blueprintId}`}
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
                  <Link href={`/blueprint/${blueprintId}`}>
                    <div className="cursor-pointer relative z-1">
                      <Logo primary />
                    </div>
                  </Link>
                </div>
              </div>
              {navigation && navigation.length > 0 && (
                <div className="px-6 pt-6">
                  <h2 className="font-small mb-2 font-semibold">Navigation</h2>
                  <div className="relative z-10 mt-5">
                    {navigation.map((elem, index) => {
                      return (
                        <div key={elem.id}>
                          <Link href={`/blueprint/${blueprintId}/${elem.id}`}>
                            <span
                              className={`${index !== 0 ? `pt-3` : ""} ${
                                router.query.pageId == elem.id
                                  ? `text-theme-primary hover:text-theme-primary border-theme-primary hover:border-theme-primary font-medium`
                                  : `border-gray-200 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300`
                              } text-sm font-light cursor-pointer block border-l pl-4 -ml-px truncate pr-3`}
                            >
                              {elem.attributes.title}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="RENDERER FRAME__sidebar-enabled lg:ml-auto lg:mr-0 min-h-screen">
              {singularData && (
                <>
                  <div>
                    <Frame key={singularData?.data?.id} data={editorState}>
                      <Element is={Container} padding={0} background="#fff"></Element>
                    </Frame>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        <FrameFooter className="FRAME__sidebar-enabled mx-auto lg:mr-0 lg:ml-auto" />
      </Editor>
    </>
  );
};

export default PublicBluePrintPage;

export async function getServerSideProps(context) {
  const pageId = context.params.pageId;
  const blueprintId = context.params.blueprintId;
  return SSR__PageAndBlueprintByIdGET(blueprintId, pageId);
}
