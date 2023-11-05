import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://test-front.framework.team",
  }),
  endpoints(build) {
    return {
      getPaintings: build.query({
        query: (setting) => ({
          url: `/paintings?${setting.q}${setting.page}${setting.limit}${setting.author}${setting.locations}${setting.from}${setting.before}`,
          method: "get",
        }),
      }),
      getAuthors: build.query({
        query: () => ({
          url: `/authors`,
          method: "get",
        }),
      }),
      getLocations: build.query({
        query: () => ({
          url: `/locations`,
          method: "get",
        }),
      }),
    };
  },
});

export const { useGetPaintingsQuery, useGetAuthorsQuery, useGetLocationsQuery } = apiSlice;
