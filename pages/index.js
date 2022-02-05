import React from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";

export default function App() {
  return (
    <>
      <DashboardHeader logoCentered />
      <Main>
        <PageTitle title="Client Name" className="text-center" />
        <ContentWrapper className="max-w-lg pt-9">
          <Link href="/blueprint-designer" passHref>
            <div className="cursor-pointer card shadow-lg mb-5 text-theme-text border-2 border-theme-border">
              <div className="card-body">
                <h2 className="card-title">Blueprint Designer</h2>
                <p>Rerum reiciendis beatae tenetur excepturi</p>
                <button
                  type="button"
                  className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm"
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
                className="px-6 py-2 mt-4 w-max rounded border border-theme-border bg-theme-panel-dark text-theme-text-light text-sm"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </ContentWrapper>
      </Main>
    </>
  );
}
