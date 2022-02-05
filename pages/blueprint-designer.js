import React from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";

const BlueprintDesigner = () => {
  return (
    <>
      <DashboardHeader />
      <Main>
        <PageTitle title="Blueprint Designer" renderClientName renderActionButton />
        <ContentWrapper>
          <div className="overflow-x-auto border border-theme-border">
            <table className="COMPONENT__table table w-full text-theme-text text-sm">
              <thead className="bg-theme-panel border-b border-theme-border">
                <tr>
                  <th>Name</th>
                  <th>Updated Date</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                <Link href="/pages">
                  <tr>
                    <td>Dummy Blueprint</td>
                    <td>
                      May 29, 2021<span className="text-xs block">11:55 PM</span>
                    </td>
                    <td>
                      May 29, 2021<span className="text-xs block">11:55 PM</span>
                    </td>
                  </tr>
                </Link>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
                <tr>
                  <td>Dummy Blueprint</td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                  <td>
                    May 29, 2021<span className="text-xs block">11:55 PM</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentWrapper>
      </Main>
    </>
  );
};

export default BlueprintDesigner;
