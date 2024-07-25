import express from "express";
import {
  createComment,
  getComments,
  getCommentsLength,
  deleteComment,
} from "../controllers/commentController.js";

const commentRoute = express.Router();

//Create comment
commentRoute.post("/", createComment);

//Get comments
commentRoute.get("/:postId", getComments);

//Get comments length
commentRoute.get("/:postId/length", getCommentsLength);

//Delete comment
commentRoute.delete("/:commentId/delete", deleteComment);

export default commentRoute;
