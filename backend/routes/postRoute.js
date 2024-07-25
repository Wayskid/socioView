import express from "express";
import {
  getFeedPosts,
  createPost,
  getAllUserPosts,
  likePost,
  getPostsUserLiked,
  getMediaUserPosts,
  deletePost,
  addToBookmark,
  getBookmarks,
  searchPosts,
} from "../controllers/postController.js";

const postRoute = express.Router();

//Create post
postRoute.post("/", createPost);

//Get all posts
postRoute.get("/", getFeedPosts);

//Get all user posts
postRoute.get("/:username", getAllUserPosts);

//Get posts user liked
postRoute.get("/:username/posts_likes", getPostsUserLiked);

//Get user media posts
postRoute.get("/:username/posts_media", getMediaUserPosts);

//Like post
postRoute.patch("/:postId/like", likePost);

//Delete post
postRoute.delete("/:postId/delete", deletePost);

//Add to bookmark
postRoute.post("/:userId/bookmark/:postId", addToBookmark);

//Get user bookmarks
postRoute.get("/:userId/bookmark", getBookmarks);

//Search posts
postRoute.get("/search/posts", searchPosts);

export default postRoute;
