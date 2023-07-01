import express from "express";
import {
  getProfile,
  getFollowing,
  getFollowers,
  updateFollow,
  updateProfile,
  whoToFollow,
} from "../controllers/profileController.js";

const profileRoute = express.Router();


//Get profile
profileRoute.get("/:username", getProfile);

//Get following
profileRoute.get("/:username/following", getFollowing);

//Get followers
profileRoute.get("/:username/followers", getFollowers);

//Update follow
profileRoute.patch("/:userId/:followId", updateFollow);

//Edit profile
profileRoute.patch("/:userId", updateProfile);

//Who to follow
profileRoute.get("/:userId/whoToFollow", whoToFollow);

export default profileRoute;
