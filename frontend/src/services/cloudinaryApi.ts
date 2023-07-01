import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.cloudinary.com/v1_1/diiohnshc/image";

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadToCloudinary: builder.mutation<CloudinaryResultType, FormData>({
      query: (imgData) => ({
        url: "/upload",
        method: "post",
        body: imgData,
      }),
    }),
  }),
});

export const { useUploadToCloudinaryMutation } = cloudinaryApi;
