import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { Sleeper } from "@/lib/Helpers";

// Main Fetcher Function
const Fetcher = (url) =>
  axios
    .get(url)
    .then(Sleeper(300))
    .then((res) => res.data);

// *****Get Requests
export const useClientsGET = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/clients`, Fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useClientGET = (id) => {
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}` : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useBlueprintsByClientGET = (id) => {
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/clients/${id}?populate=blueprints` : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useBlueprintByIdGET = (id) => {
  const { data, error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_API_URL}/blueprints/${id}?populate=client&populate=pages`
      : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePageByIdGET = (id) => {
  const { data, error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_API_URL}/pages/${id}?populate=blueprint&populate=client`
      : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useMediaGET = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/files?sort=createdAt:desc`,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
