import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
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
      default: "",
    },
    postMsg: String,
    postImg: String,
    postVideo: String,
    likes: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
