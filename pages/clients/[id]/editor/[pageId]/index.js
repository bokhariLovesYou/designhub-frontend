import React, { useState, useEffect } from "react";
import Header from "@/components/layouts/editor/Header";
import Sidebar from "@/components/layouts/editor/Sidebar";
import Main from "@/components/layouts/Main";
import SimpleContent from "@/components/blocks/SimpleContent";
import Drawer from "@/components/parts/Drawer";
import MediaDrawer from "@/components/parts/MediaDrawer";
import ImageGallery from "@/components/parts/ImageGallery";
import { Container } from "@/components/blocks/Container";
import { useAppContext } from "@/context/AppWrapper";

// Blocks
import { HeadingDescriptionCta, HeadingWithContent } from "@/components/blocks";

// SEO
import { NextSeo } from "next-seo";

// Craft
import { Editor, Frame, Element } from "@craftjs/core";

// Static Blocks
import FrameHeader from "@/components/blocks/staticBlocks/FrameHeader";
import FrameFooter from "@/components/blocks/staticBlocks/FrameFooter";

// Compressor
import lz from "lzutf8";

// Fetchers
import Spinner from "@/components/core/Spinner";
import axios from "axios";
import { Sleeper } from "@/lib/Helpers";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { usePageByIdGET } from "@/lib/Fetcher";

// Form
import { useForm } from "react-hook-form";
import { InputLF, TextareaLF } from "@/components/core/FormElements";

const PageEditor = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { pageId, id } = router.query;
  const { data, isLoading, isError } = usePageByIdGET(pageId);
  const { globalState, handlers } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [updatePageSettings, setUpdatePageSettings] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [updatePage, setUpdatePage] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [pageQuery, setPageQuery] = useState(null);
  const [canSave, setCanSave] = useState(false);
  const [showPageSettings, setShowPageSettings] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [enableResponsive, setEnableResponsive] = useState(false);
  const [renderLayers, setRenderLayers] = useState(false);
  const handleRenderLayers = () => {
    setTimeout(() => {
      setRenderLayers(renderLayers ? false : true);
    }, 50);
  };
  let pageData;
  let editorState;
  let clientData;
  if (data) {
    pageData = data.data.attributes;
    clientData = data.data.attributes.client.data.attributes;
    editorState = pageData.draftEditorState
      ? lz.decompress(lz.decodeBase64(pageData.draftEditorState))
      : pageData.draftEditorState;
  }

  // console.log(editorState);

  const updatePageDraft = () => {
    setUpdatePage((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      data: {
        draftTitle: pageData.draftTitle,
        draftDescription: pageData.draftDescription,
        draftEditorState: lz.encodeBase64(lz.compress(pageQuery)),
      },
    };
    const putPayload = async () => {
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`, payload)
        .then(Sleeper(500))
        .then((res) => {
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}?populate=blueprint&populate=client`,
            (data) => {
              console.log(data);
              return {
                ...data,
                draftTitle: pageData.draftTitle,
                draftDescription: pageData.draftDescription,
                draftEditorState: lz.encodeBase64(lz.compress(pageQuery)),
              };
            },
            false
          );
          setUpdatePage((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          // if (pendingChanges > 0) {
          //   setCanSave(true);
          //   setPendingChanges(0);
          // } else {
          //   setCanSave(false);
          // }
          setCanSave(false);
          // console.log(pendingChanges);
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}?populate=blueprint&populate=client`
          );
        })
        .catch((err) => {
          console.log(err);
          setUpdatePage((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        });
    };
    putPayload();
  };

  // const autoSave = () => {
  //   if (canSave && editorReady) {
  //     updatePageDraft();
  //   }
  // };

  const pageSettingsHandler = (bool) => {
    setShowPageSettings(bool);
    if (!bool) {
      reset(
        {
          pageTitle: data && pageData.draftTitle,
          pageDescription: data && pageData.draftDescription,
        },
        { keepDefaultValues: true }
      );
    }
  };

  const updatePageMeta = (updatedData) => {
    console.log(updatedData);
    setUpdatePageSettings((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      data: {
        title: updatedData.pageTitle,
        description: updatedData.pageDescription,
        draftTitle: updatedData.pageTitle,
        draftDescription: updatedData.pageDescription,
      },
    };
    const putPayload = async () => {
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`, payload)
        .then(Sleeper(500))
        .then((res) => {
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}?populate=blueprint&populate=client`,
            (data) => {
              return {
                ...data,
                data: {
                  ...data.data,
                  attributes: {
                    ...data.data.attributes,
                    title: updatedData.pageTitle,
                    description: updatedData.pageDescription,
                    draftTitle: updatedData.pageTitle,
                    draftDescription: updatedData.pageDescription,
                  },
                },
              };
            },
            false
          );
          setUpdatePageSettings((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}?populate=blueprint&populate=client`
          );
          handlers.handleDrawer();
          setShowPageSettings(false);
        })
        .catch((err) => {
          console.log(err);
          setUpdatePageSettings((prevState) => ({ ...prevState, isError: true, isLoading: false }));
          setShowPageSettings(false);
        });
    };
    putPayload();
  };

  const enableResponsiveMode = () => {
    setEnableResponsive(enableResponsive ? false : true);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEditorReady(true);
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     autoSave();
  //   }, 1500);
  //   return () => {
  //     clearInterval(interval);
  //     interval = 0;
  //   };
  // }, [pageQuery, canSave, pendingChanges]);

  return (
    <>
      <NextSeo title="Editor | Design Lab | OneIMS" description="Edit pages" />
      <div className="h-screen overflow-hidden">
        <Editor
          onNodesChange={(query) => {
            setPageQuery(query.serialize());
            setCanSave(true);
            // if (editorReady) {
            //   setCanSave(true);
            //   setPendingChanges(pendingChanges + 1);
            // }
          }}
          indicator={{
            success: "#0091ae",
            error: "#e34850",
            transition: "0s ease",
            thickness: 5,
          }}
          resolver={{ Container, HeadingWithContent, SimpleContent, HeadingDescriptionCta }}
        >
          <Header
            pageSettingsHandler={pageSettingsHandler}
            enableResponsiveMode={enableResponsiveMode}
            enableResponsive={enableResponsive}
            canSave={canSave}
            updatePage={updatePage}
            updatePageDraft={updatePageDraft}
            router={router}
            clientId={id}
            pageData={data ? pageData : null}
            clientData={data ? clientData : null}
          />
          <Main>
            <div className="theme-row flex">
              <Sidebar
                loading={isLoading}
                renderLayers={renderLayers}
                handleRenderLayers={handleRenderLayers}
              />
              <div
                className={`transition-all duration-200 overflow-hidden w-full ${
                  enableResponsive
                    ? `max-w-lg mx-auto ring-theme-primary ring-opacity-30 transition-all duration-400 ring-2`
                    : ``
                }`}
              >
                <div
                  className="theme-column w-full pb-20 overflow-y-scroll"
                  style={{ height: "100vh" }}
                >
                  <FrameHeader loading={isLoading} clientData={data ? clientData : null} />
                  <div className="pb-10 COMPONENT__editor" onClick={() => setRenderLayers(false)}>
                    {data && (
                      <>
                        <Frame data={editorState}>
                          <Element is={Container} padding={0} background="#fff" canvas />
                        </Frame>
                      </>
                    )}
                    {isLoading && (
                      <>
                        <div
                          className="flex justify-center items-center flex-col"
                          style={{ height: "400px" }}
                        >
                          <Spinner />
                        </div>
                      </>
                    )}

                    <div></div>
                    <FrameFooter />
                  </div>
                </div>
              </div>
            </div>
          </Main>
          {data && (
            <>
              <Drawer
                active={showPageSettings && globalState.drawerOpen}
                title={`Page Settings`}
                buttonOneTitle={`Save`}
                buttonOneDisabled={errors.pageTitle}
                buttonOneLoading={updatePageSettings.isLoading}
                buttonOneHandler={handleSubmit(updatePageMeta)}
                pageSettingsHandler={pageSettingsHandler}
              >
                <div className="mb-4">
                  <h2 className="font-medium text-theme-text mb-2">Update Page Meta</h2>
                  <p className="text-theme-text text-xs leading-relaxed">
                    Page meta is published immediately and will be displayed as the{" "}
                    <strong>Meta Data</strong> as well as the <strong>Label</strong> of the page
                  </p>
                </div>

                <>
                  <InputLF
                    type="text"
                    wrapperClassName="mt-5 text-left"
                    label="Page Title*"
                    name="pageTitle"
                    defaultValue={pageData.draftTitle}
                    register={register}
                    rest={{ required: true }}
                  />
                  <TextareaLF
                    wrapperClassName="mt-5 text-left"
                    label="Page Description"
                    name="pageDescription"
                    defaultValue={pageData.draftDescription}
                    register={register}
                  />
                </>
              </Drawer>
              <MediaDrawer active={globalState.drawerOpen && !showPageSettings} />
            </>
          )}
        </Editor>
      </div>
    </>
  );
};

export default PageEditor;
