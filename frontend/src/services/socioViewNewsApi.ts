import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://newsapi.org/v2";

export const socioViewNewsApi = createApi({
  reducerPath: "socioViewNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getSocioViewNews: builder.query({
      query: () => ({
        url: `/top-headlines?country=us&category=technology&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetSocioViewNewsQuery } = socioViewNewsApi;
