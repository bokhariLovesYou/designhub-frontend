import React from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";
import Spinner from "@/components/core/Spinner";
import { useClientGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";

const ClientSingular = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useClientGET(id);
  return (
    <>
      <DashboardHeader logoCentered />
      <Main>
        {isLoading && <PageTitle title="Loading" className="text-center" />}
        {data && <PageTitle title={data.data.attributes.title} className="text-center" />}
        {isLoading && (
          <div className="flex justify-center items-center flex-col]" style={{ height: "400px" }}>
            <Spinner />
          </div>
        )}
        {data && (
          <ContentWrapper className="max-w-lg pt-9">
            <Link href={`${router.asPath}/bp`} passHref>
              <div className="cursor-pointer card shadow-lg mb-5 text-theme-text border-2 border-theme-border">
                <div className="card-body">
                  <h2 className="card-title">Blueprint Designer</h2>
                  <p>Rerum reiciendis beatae tenetur excepturi</p>
                  <button
                    type="button"
                    className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm hover:bg-theme-panel-hover"
                  >
                    Access
                  </button>
                </div>
              </div>
            </Link>

            <div className="card shadow-lg text-theme-text border-2 border-theme-border">
              <div className="card-body">
                <h2 className="card-title">Prototype Designer</h2>
                <p>Rerum reiciendis beatae tenetur excepturi</p>
                <button
                  type="button"
                  className="cursor-not-allowed px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark opacity-60 text-theme-text-light text-sm"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </ContentWrapper>
        )}
      </Main>
    </>
  );
};

export default ClientSingular;
