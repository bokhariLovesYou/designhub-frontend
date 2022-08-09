import React, { useState } from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import { SSR__BlueprintByIdGET } from "@/lib/Fetcher";
import { format } from "date-fns";
// SEO
import { NextSeo } from "next-seo";

const PublicBluePrintIndex = ({ data }) => {
  let attributes, client, pages, blueprintId;
  if (data) {
    blueprintId = data.data.id;
    attributes = data.data.attributes;
    client = attributes.client.data.attributes;
    pages = attributes.pages.data;
  }

  pages = pages.filter((elem, index) => pages[index].attributes.status === "published");
  pages = pages.sort((a, b) => a.attributes.orderId - b.attributes.orderId);

  return (
    <>
      <NextSeo
        title={
          data ? `${attributes.title} | Design Lab | OneIMS` : `Blueprint | Design Lab | OneIMS`
        }
        description={``}
      />
      <DashboardHeader publicView={true} />
      <Main>
        <PageTitle
          title={attributes.title}
          clientTitle={client.title}
          clientRoute={null}
          renderActionButton={false}
          renderOptionsButton={false}
        />
        <ContentWrapper>
          {data && pages.length < 1 && (
            <div className="w-full mx-auto text-theme-text pt-5">
              <h1 className="text-xl font-medium mb-3">Something&apos;s happening.</h1>
              <p className="text-sm mb-1">
                We&apos;re currently working on this blueprint. Please come back to this page at a
                later date.
              </p>
            </div>
          )}
          {data && pages.length > 0 && (
            <div className="overflow-x-auto border border-theme-border">
              <table className="COMPONENT__table table w-full text-theme-text text-sm">
                <thead className="bg-theme-panel border-b border-theme-border">
                  <tr>
                    <th>Name</th>
                    <th>Publish Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((elem) => (
                    <TableItem
                      key={elem.id}
                      blueprintId={blueprintId}
                      id={elem.id}
                      title={elem.attributes?.title}
                      order={elem.attributes?.orderId}
                      status={elem.attributes?.status}
                      createdAt={elem.attributes?.createdAt}
                      updatedAt={elem.attributes?.updatedAt}
                      publishedAt={elem.attributes?.publishedAtTimestamp}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ContentWrapper>
      </Main>
    </>
  );
};

const TableItem = (props) => {
  const timestamps = {
    createdAt: {
      date: props?.createdAt ? format(new Date(props?.createdAt), "MMM d, yyyy") : `...`,
      time: props?.createdAt ? format(new Date(props?.createdAt), "hh:mm a") : `...`,
    },
    updatedAt: {
      date: props?.updatedAt ? format(new Date(props?.updatedAt), "MMM d, yyyy") : `N/A`,
      time: props?.updatedAt ? format(new Date(props?.updatedAt), "hh:mm a") : `...`,
    },
    publishedAt: {
      date: props?.publishedAt ? format(new Date(props?.publishedAt), "MMM d, yyyy") : `N/A`,
      time: props?.publishedAt ? format(new Date(props?.publishedAt), "hh:mm a") : `...`,
    },
  };

  return (
    <tr>
      <td className="relative">
        <a
          className="absolute inset-0"
          aria-label={props.title}
          title={props.title}
          href={`/blueprint/${props.blueprintId}/${props.id}`}
        ></a>
        <span>{props.title}</span>
        {/* <span className="text-xs block mb-1 mt-1">Order: {props.order}</span> */}
        <span className="text-xs block mt-2">
          <div
            className={`indicator w-2 h-2 mr-1 rounded-full ${
              props.status === "published" ? `bg-green-500` : `bg-gray-400`
            }`}
          ></div>{" "}
          {props.status === "published" ? `Published` : `Draft`}
        </span>
      </td>
      <td className="relative">
        <a
          className="absolute inset-0"
          aria-label={props.title}
          title={props.title}
          href={`/blueprint/${props.blueprintId}/${props.id}`}
        ></a>
        {timestamps.publishedAt.date ? timestamps.publishedAt.date : `...`}
        <span className="text-xs block">
          {timestamps.publishedAt.time ? timestamps.publishedAt.time : ``}
        </span>
      </td>
    </tr>
  );
};

export default PublicBluePrintIndex;

export async function getServerSideProps(context) {
  const blueprintId = context.params.blueprintId;
  return SSR__BlueprintByIdGET(blueprintId);
}
