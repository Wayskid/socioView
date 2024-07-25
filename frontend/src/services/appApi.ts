import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://socioview.onrender.com/api";

export const appApi = createApi({
  reducerPath: "AppAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    "UpdateFeed",
    "UpdateProfile",
    "UpdateComments",
    "UpdateBookmarks",
    "UpdateWhoToFollow",
  ],
  endpoints: (builder) => ({
    getFeeds: builder.query<PostsTypes[], String>({
      query: (token) => ({
        url: "/posts",
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateFeed" as const,
                _id,
              })),
              "UpdateFeed",
            ]
          : ["UpdateFeed"],
    }),
    login: builder.mutation<UserInfoType, LoginDetTypes>({
      query: (loginDetails) => ({
        url: "/users/login",
        method: "post",
        body: loginDetails,
      }),
    }),
    registerUser: builder.mutation<UserInfoType, RegDetTypes>({
      query: (regDetails) => ({
        url: "/users",
        method: "post",
        body: regDetails,
      }),
    }),
    getUserProfile: builder.query<
      UserInfoType,
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/profile/${username}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => [{ type: "UpdateProfile" }],
    }),
    createPost: builder.mutation<
      PostsTypes,
      { token: String; newPost: NewPostsTypes }
    >({
      query: ({ token, newPost }) => ({
        url: `/posts`,
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: newPost,
      }),
      invalidatesTags: ["UpdateFeed"],
    }),
    getAllUserPosts: builder.query<
      PostsTypes[],
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/posts/${username}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateFeed" as const,
                _id,
              })),
              "UpdateFeed",
            ]
          : ["UpdateFeed"],
    }),
    getPostsUserLiked: builder.query<
      PostsTypes[],
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/posts/${username}/posts_likes`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateFeed" as const,
                _id,
              })),
              "UpdateFeed",
            ]
          : ["UpdateFeed"],
    }),
    getMediaUserPosts: builder.query<
      PostsTypes[],
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/posts/${username}/posts_media`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateFeed" as const,
                _id,
              })),
              "UpdateFeed",
            ]
          : ["UpdateFeed"],
    }),
    likePost: builder.mutation<
      PostsTypes,
      { postId: String; userId: String; token: String }
    >({
      query: ({ postId, userId, token }) => ({
        url: `/posts/${postId}/like`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { userId },
      }),
      invalidatesTags: ["UpdateFeed"],
    }),
    updateFollow: builder.mutation<
      PostsTypes,
      { userId: String; followId: String; token: String }
    >({
      query: ({ userId, followId, token }) => ({
        url: `/profile/${userId}/${followId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["UpdateProfile", "UpdateWhoToFollow"],
    }),
    editProfile: builder.mutation<
      UserInfoType,
      {
        token: String;
        userId: String;
        updateProfileVal: UpdateProfileTypes;
      }
    >({
      query: ({ token, userId, updateProfileVal }) => ({
        url: `/profile/${userId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: updateProfileVal,
      }),
      invalidatesTags: ["UpdateProfile", "UpdateFeed", "UpdateComments"],
    }),
    getFollowers: builder.query<
      UserInfoType[],
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/profile/${username}/followers`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["UpdateProfile"],
    }),
    getFollowing: builder.query<
      UserInfoType[],
      { username: String | undefined; token: String }
    >({
      query: ({ username, token }) => ({
        url: `/profile/${username}/following`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["UpdateProfile"],
    }),
    deletePost: builder.mutation<undefined, { token: String; postId: String }>({
      query: ({ token, postId }) => ({
        url: `/posts/${postId}/delete`,
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["UpdateFeed"],
    }),
    addToBookmark: builder.mutation<
      PostsTypes,
      { token: String; postId: String; userId: String }
    >({
      query: ({ token, postId, userId }) => ({
        url: `/posts/${userId}/bookmark/${postId}`,
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["UpdateFeed", "UpdateBookmarks"],
    }),
    getUserBookmarks: builder.query<
      PostsTypes[],
      { token: String; userId: String }
    >({
      query: ({ token, userId }) => ({
        url: `/posts/${userId}/bookmark`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateBookmarks" as const,
                _id,
              })),
              "UpdateBookmarks",
            ]
          : ["UpdateBookmarks"],
    }),
    createComment: builder.mutation<
      CommentsTypes,
      { token: String; newComment: NewCommentsTypes }
    >({
      query: ({ token, newComment }) => ({
        url: "/comments",
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: newComment,
      }),
      invalidatesTags: ["UpdateComments", "UpdateFeed"],
    }),
    getComments: builder.query<
      CommentsTypes[],
      { token: String; postId: String }
    >({
      query: ({ token, postId }) => ({
        url: `/comments/${postId}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "UpdateComments" as const,
                _id,
              })),
              "UpdateComments",
            ]
          : ["UpdateComments"],
    }),
    deleteComment: builder.mutation<
      undefined,
      { token: String; commentId: String }
    >({
      query: ({ token, commentId }) => ({
        url: `/comments/${commentId}/delete`,
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["UpdateComments"],
    }),
    getCommentsLength: builder.query<Number, { token: String; postId: String }>(
      {
        query: ({ token, postId }) => ({
          url: `/comments/${postId}/length`,
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
        providesTags: ["UpdateComments"],
      }
    ),
    usernameSetting: builder.mutation<
      UserInfoType | string,
      {
        token: String;
        userId: String;
        newUsername: String;
      }
    >({
      query: ({ token, userId, newUsername }) => ({
        url: `/users/settings/username/${userId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { newUsername },
      }),
    }),
    emailSetting: builder.mutation<
      UserInfoType | string,
      {
        token: String;
        userId: String;
        newEmail: String;
      }
    >({
      query: ({ token, userId, newEmail }) => ({
        url: `/users/settings/email/${userId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { newEmail },
      }),
    }),
    searchPosts: builder.mutation<
      PostsTypes[],
      {
        token: String;
        keyword: String;
      }
    >({
      query: ({ token, keyword }) => ({
        url: `/posts/search/posts?keyword=${keyword}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    searchUsers: builder.mutation<
      UserInfoType[],
      {
        token: String;
        keyword: String;
      }
    >({
      query: ({ token, keyword }) => ({
        url: `/users/search/users?keyword=${keyword}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    changePassword: builder.mutation<
      UserInfoType | String,
      {
        token: String;
        userId: String;
        passwordData: { currentPassword: String; newPassword: String };
      }
    >({
      query: ({ token, userId, passwordData }) => ({
        url: `/users/settings/password/${userId}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: passwordData,
      }),
    }),
    whoToFollow: builder.query<
      UserInfoType[],
      {
        token: String;
        userId: String;
      }
    >({
      query: ({ token, userId }) => ({
        url: `/profile/${userId}/whoToFollow`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["UpdateWhoToFollow"],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useLoginMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
  useCreatePostMutation,
  useGetAllUserPostsQuery,
  useGetPostsUserLikedQuery,
  useGetMediaUserPostsQuery,
  useLikePostMutation,
  useUpdateFollowMutation,
  useEditProfileMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useDeletePostMutation,
  useAddToBookmarkMutation,
  useGetUserBookmarksQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useGetCommentsLengthQuery,
  useUsernameSettingMutation,
  useEmailSettingMutation,
  useSearchUsersMutation,
  useSearchPostsMutation,
  useChangePasswordMutation,
  useWhoToFollowQuery,
} = appApi;
