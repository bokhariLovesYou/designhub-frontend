import React from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Spinner from "@/components/core/Spinner";
import { useClientsGET } from "@/lib/Fetcher";
import Link from "next/link";

const ClientsIndex = () => {
  const { data, isLoading, isError } = useClientsGET();

  return (
    <>
      <DashboardHeader />
      <Main>
        <PageTitle title=" All Clients" />
        <ContentWrapper>
          <div className="overflow-x-auto border border-theme-border">
            <table className="COMPONENT__table table w-full text-theme-text text-sm">
              <thead className="bg-theme-panel border-b border-theme-border">
                <tr>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <>
                    <tr className="loader-wrapper">
                      <td colSpan="12">
                        <div className="min-h-max w-full flex flex-col justify-center items-center">
                          <Spinner />
                        </div>
                      </td>
                    </tr>
                  </>
                )}
                {data &&
                  data.data.map((elem) => {
                    const { id } = elem;
                    const { title } = elem.attributes;
                    return (
                      <Link key={id} href={`/clients/${id}`}>
                        <tr>
                          <td>{title}</td>
                          <td></td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="px-6 py-2 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-xs hover:bg-theme-panel-hover"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      </Link>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </ContentWrapper>
      </Main>
    </>
  );
};

export default ClientsIndex;
