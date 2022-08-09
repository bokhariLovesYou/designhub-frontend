import React, { useState, Fragment } from "react";
import Button from "@/components/core/Button";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "@/components/core/Spinner";

const Topbar = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalUnpublish, setModalUnpublish] = useState(false);
  const pageData = props.pageData ? props.pageData : null;

  return (
    <>
      <div className="py-4 bg-theme-dark text-theme-text-inverted">
        <div className="theme-container mx-auto px-4">
          <div className="theme-row flex items-center -mx-1 justify-between">
            <div className="theme-column px-1 w-full max-w-3/4 flex justify-start items-center">
              <div className="theme-row flex items-center -mx-1">
                <div className="theme-column px-1">
                  {props.pageData ? (
                    <a href={`/clients/${props.clientId}/bp/${pageData.blueprint.data.id}`}>
                      <Button variant="dark" className="text-xs">
                        Back
                      </Button>
                    </a>
                  ) : (
                    <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
                  )}
                </div>
                <div className="theme-column px-1">
                  {props.pageData ? (
                    <>
                      <div className="flex">
                        <Button
                          onClick={() => props.updatePageDraft()}
                          loading={props.updatePage.isLoading}
                          variant="dark"
                          className="text-xs"
                          xs={true}
                        >
                          Save
                        </Button>
                        {props.updatePage.isLoading ? (
                          <div className="pl-3 flex items-center">
                            <span className="text-white text-sm">Saving...</span>
                          </div>
                        ) : (
                          <div className="pl-3 flex items-center">
                            {props.canSave ? (
                              <span className="text-white text-sm">Unsaved Changes</span>
                            ) : (
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span className="text-white text-sm flex pl-1">Saved</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
                  )}
                </div>
              </div>
            </div>

            <div className="theme-column px-1 w-full flex justify-center items-center">
              <div className="theme-box">
                {props.pageData ? (
                  <h1 className="text-2xl font-medium truncate max-w-xs">{pageData.draftTitle}</h1>
                ) : (
                  <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-44 inline-block rounded "></span>
                )}
              </div>
            </div>

            <div className="theme-column px-1 w-full max-w-3/4 flex justify-end items-center">
              <div className="theme-box">
                {props.pageData ? (
                  <>
                    {props.pageData?.status === "draft" && (
                      <Button
                        variant="primary"
                        className="text-xs"
                        onClick={() => {
                          setModalUnpublish(false);
                          props.updatePageDraft();
                          setOpenModal(true);
                        }}
                      >
                        Publish
                      </Button>
                    )}
                    {props.pageData?.status === "published" && (
                      <div className="flex items-center -mx-1">
                        <div className="theme-column px-1">
                          <Button
                            variant="dark"
                            className="text-xs"
                            onClick={() => {
                              setOpenModal(true);
                              props.updatePageDraft();
                              setModalUnpublish(true);
                            }}
                          >
                            Unpublish
                          </Button>
                        </div>
                        <div className="theme-column px-1">
                          <Button
                            variant="primary"
                            className="text-xs"
                            onClick={() => {
                              setModalUnpublish(false);
                              props.updatePageDraft();
                              setOpenModal(true);
                            }}
                          >
                            Update and Publish
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="COMPONENT__skeleton-box COMPONENT__skeleton-box-dark mt-2 h-6 w-24 inline-block rounded"></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: `999999999999999` }}
          onClose={setOpenModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-filter backdrop-blur-sm transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {!modalUnpublish
                        ? `Your page will be published and updated`
                        : `Your page will be unpublished`}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {!modalUnpublish
                          ? `Once you publish, your updates will be live and visible to the world.`
                          : `Once you unpublish your page, the page will not be visible to the world but may still be editable.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => {
                      !modalUnpublish
                        ? props.handlePublishPage()
                        : props.handlePublishPage("unpublish");
                    }}
                    type="button"
                    className={`${
                      props.publishPage.isLoading && `opacity-50 pointer-events-none`
                    } w-full inline-flex justify-center rounded border border-transparent px-6 py-2 bg-theme-primary font-medium text-white hover:bg-theme-primary-hover sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {props.publishPage?.isLoading && <Spinner button white />}
                    {!modalUnpublish ? `Publish Page` : `Unpublish Page`}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded border border-theme-border px-6 py-2 bg-theme-panel-dark text-theme-text-light hover:bg-theme-panel-hover sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Topbar;
