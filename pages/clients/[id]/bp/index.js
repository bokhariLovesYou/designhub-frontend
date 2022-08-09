import React, { useEffect, useState, Fragment } from "react";
import DashboardHeader from "@/components/parts/DashboardHeader";
import PageTitle from "@/components/parts/PageTitle";
import Main from "@/components/layouts/Main";
import ContentWrapper from "@/components/parts/ContentWrapper";
import Link from "next/link";
import Spinner from "@/components/core/Spinner";

import axios from "axios";
import { Sleeper } from "@/lib/Helpers";

import { InputLF } from "@/components/core/FormElements";
import { Dialog, Transition } from "@headlessui/react";

import { useForm } from "react-hook-form";

import { useBlueprintsByClientGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";

import { parseISO, format } from "date-fns";

// SEO
import { NextSeo } from "next-seo";

const BlueprintsIndex = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useBlueprintsByClientGET(id);
  const [openModal, setOpenModal] = useState(false);
  const [newBlueprint, setNewBlueprint] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  let blueprints;
  if (data) {
    blueprints = data.data.attributes.blueprints.data;
    console.log(blueprints);
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    setNewBlueprint((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      data: {
        title: data.blueprintTitle,
        client: id,
      },
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/blueprints/`, payload)
        .then(Sleeper(500))
        .then((res) => {
          setNewBlueprint((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          const blueprintId = res.data.data.id;
          if (typeof window !== "undefined") {
            window.location.href = `${router.asPath}/${blueprintId}`;
          }
        })
        .catch((err) => {
          console.log(err);
          setNewBlueprint((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        });
    };
    postPayload();
  };

  useEffect(() => {
    setError("blueprintTitle", { type: "required" });
  }, []);
  return (
    <>
      <NextSeo
        title={
          data
            ? `${data.data.attributes.title} Blueprints | Design Lab | OneIMS`
            : `All Blueprints | Design Lab | OneIMS`
        }
        description={``}
      />
      <DashboardHeader />
      <Main>
        {data && (
          <PageTitle
            title="Blueprint Designer"
            clientTitle={data.data.attributes.title}
            renderActionButton
            actionsOnClick={() => setOpenModal(true)}
          />
        )}
        {isLoading && (
          <PageTitle title="Blueprint Designer" clientTitle="Loading" renderActionButton />
        )}
        <ContentWrapper>
          {isLoading && (
            <div className="flex justify-center items-center flex-col" style={{ height: "400px" }}>
              <Spinner />
            </div>
          )}
          {data && blueprints.length < 1 && (
            <div className="max-w-xl w-full mx-auto text-theme-text pt-5">
              <h1 className="text-xl font-medium mb-3">Create Blueprints</h1>
              <p className="text-sm mb-1">
                Create blueprints that prove to be knowledgable for clients. A blueprint may consist
                of multiple pages and acts as a resource for the client&apos;s marketing strategy.
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
          {data && blueprints.length > 0 && (
            <div className="overflow-x-auto border border-theme-border">
              <table className="COMPONENT__table table w-full text-theme-text text-sm">
                <thead className="bg-theme-panel border-b border-theme-border">
                  <tr>
                    <th>Name</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {blueprints.map((elem) => {
                    const createdAtDate = format(
                      new Date(elem.attributes?.createdAt),
                      "MMM d, yyyy"
                    );
                    const createdAtTime = format(new Date(elem.attributes?.createdAt), "hh:mm a");
                    return (
                      <Link key={elem.id} href={`${router.asPath}/${elem.id}`}>
                        <tr>
                          <td>{elem.attributes.title}</td>
                          <td>
                            {createdAtDate}
                            <span className="text-xs block">{createdAtTime}</span>
                          </td>
                        </tr>
                      </Link>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </ContentWrapper>
      </Main>

      <Transition.Root show={openModal} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpenModal}>
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                      Add a New Blueprint {data && `for ${data.data.attributes.title}`}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        A blueprint may consist of multiple pages and acts as a resource for the
                        client&apos;s marketing strategy.
                      </p>
                    </div>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <input type="text" {...register("blueprintTitle", { required: true })} /> */}
                        <InputLF
                          type="text"
                          wrapperClassName="mt-5 text-left"
                          label="Blueprint Title*"
                          name="blueprintTitle"
                          register={register}
                          rest={{ required: true }}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`${errors.blueprintTitle && `opacity-50 pointer-events-none`} ${
                      newBlueprint.isLoading && `opacity-50 pointer-events-none`
                    } w-full inline-flex justify-center rounded border border-transparent px-6 py-2 bg-theme-primary font-medium text-white hover:bg-theme-primary-hover sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {newBlueprint.isLoading && <Spinner button white />}
                    Create Blueprint
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

export default BlueprintsIndex;
