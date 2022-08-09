import React, { useEffect, useState, Fragment } from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";
import Spinner from "@/components/core/Spinner";

import axios from "axios";
import { Sleeper } from "@/lib/Helpers";
import { useForm } from "react-hook-form";
import { useTemplatesGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";

import { parseISO, format } from "date-fns";

const TemplatesIndex = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useTemplatesGET();
  const [openModal, setOpenModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  let templates;
  if (data) {
    templates = data.data;
    console.log(templates);
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <>
      <DashboardHeader />
      <Main>
        <PageTitle title="Templates" renderActionButton actionsOnClick={() => setOpenModal(true)} />
        <ContentWrapper>
          {isLoading && (
            <div className="flex justify-center items-center flex-col" style={{ height: "400px" }}>
              <Spinner />
            </div>
          )}
          {data && templates.length < 1 && (
            <div className="max-w-xl w-full mx-auto text-theme-text pt-5">
              <h1 className="text-xl font-medium mb-3">Create Templates</h1>
              <p className="text-sm mb-1">
                Create templates that are reusable for future use. A template may consist of
                multiple blocks which can easily be used to create newer pages.
              </p>
              <button
                onClick={() => setOpenModal(true)}
                type="button"
                className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
              >
                Add New
              </button>
            </div>
          )}
          {data && templates.length > 0 && (
            <div className="flex flex-wrap -mx-3">
              {templates.map((elem) => {
                const { title, industry, category, thumbnail } = elem.attributes;
                const image = {
                  url: `${
                    thumbnail.data
                      ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${thumbnail.data?.attributes?.url}`
                      : `/placeholder.png`
                  }`,
                  alt: thumbnail?.data?.attributes?.alternativeText,
                };
                const id = elem.id;
                return (
                  <div key={id} className="column px-3 mb-5 w-full md:w-3/6 lg:w-2/6">
                    <div className="COMPONENT__card cursor-pointer">
                      {image && (
                        <div className="COMPONENT__card__image-wrapper">
                          <figure>
                            <img src={image.url} alt={image.alt} />
                          </figure>
                        </div>
                      )}
                      <div className="COMPONENT__card__body">
                        {title && <h2 className="card-title">{title}</h2>}
                        {industry && <span className="COMPONENT__badge">{industry}</span>}
                        {category && <span className="COMPONENT__badge ml-3">{category}</span>}
                        <div className="mt-5 text-right flex justify-end">
                          <div className="flex items-center -m-2">
                            <div className="column px-2">
                              <button className="flex items-center px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover">
                                Preview
                                <span className="block pl-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                  </svg>
                                </span>
                              </button>
                            </div>
                            <div className="column px-2">
                              <button
                                type="button"
                                className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ContentWrapper>
      </Main>
    </>
  );
};

export default TemplatesIndex;
