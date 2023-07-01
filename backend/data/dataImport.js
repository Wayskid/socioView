import express from "express";
import User from "../models/userModel.js";
import { usersData } from "./usersData.js";
import Post from "../models/postModel.js";
import { postsData } from "./postsData.js";

const dataImport = express.Router();

dataImport.post("/user", async (req, res) => {
  await User.deleteMany({});
  const userImport = await User.insertMany(usersData);
  res.send({ userImport });
});

dataImport.post("/post", async (req, res) => {
  await Post.deleteMany({});
  const postImport = await Post.insertMany(postsData);
  res.send({ postImport });
});

// dataImport.post(
//   "/product",
//   asyncHandler(async (req, res) => {
//     await Product.deleteMany({});
//     const productImport = await Product.insertMany(products);
//     res.send({ productImport });
//   })
// );

export default dataImport;
