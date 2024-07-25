import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    commentMsg: String,
    commentImg: String,
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
